const express = require('express');
const pool = require('../config/db');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/news
 * Get all news articles (public)
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM news ORDER BY date DESC, created_at DESC'
    );

    // Transform image_urls from JSON to array for frontend compatibility
    const news = rows.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      date: item.date,
      content: item.content,
      imageUrl: item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : undefined,
      imageUrls: item.image_urls || undefined,
    }));

    res.json(news);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
});

/**
 * GET /api/news/:id
 * Get a single news article
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'News article not found.' });
    }

    const item = rows[0];
    res.json({
      id: item.id.toString(),
      title: item.title,
      date: item.date,
      content: item.content,
      imageUrl: item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : undefined,
      imageUrls: item.image_urls || undefined,
    });
  } catch (err) {
    console.error('Error fetching news article:', err);
    res.status(500).json({ error: 'Failed to fetch news article.' });
  }
});

/**
 * POST /api/news
 * Create a news article (admin only)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { title, content, date, imageUrls } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const newsDate = date || new Date().toISOString().split('T')[0];
    const images = imageUrls && imageUrls.length > 0 ? JSON.stringify(imageUrls) : null;

    const [result] = await pool.query(
      'INSERT INTO news (title, content, date, image_urls, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, content, newsDate, images, req.user.id]
    );

    res.status(201).json({
      id: result.insertId.toString(),
      title,
      content,
      date: newsDate,
      imageUrls: imageUrls || undefined,
      imageUrl: imageUrls && imageUrls.length > 0 ? imageUrls[0] : undefined,
    });
  } catch (err) {
    console.error('Error creating news:', err);
    res.status(500).json({ error: 'Failed to create news article.' });
  }
});

/**
 * PUT /api/news/:id
 * Update a news article (admin only)
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { id } = req.params;
    const { title, content, date, imageUrls } = req.body;

    const images = imageUrls && imageUrls.length > 0 ? JSON.stringify(imageUrls) : null;

    const [result] = await pool.query(
      'UPDATE news SET title = COALESCE(?, title), content = COALESCE(?, content), date = COALESCE(?, date), image_urls = ? WHERE id = ?',
      [title, content, date, images, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'News article not found.' });
    }

    res.json({ message: 'News article updated successfully.' });
  } catch (err) {
    console.error('Error updating news:', err);
    res.status(500).json({ error: 'Failed to update news article.' });
  }
});

/**
 * DELETE /api/news/:id
 * Delete a news article (admin only)
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'News article not found.' });
    }

    res.json({ message: 'News article deleted successfully.' });
  } catch (err) {
    console.error('Error deleting news:', err);
    res.status(500).json({ error: 'Failed to delete news article.' });
  }
});

module.exports = router;
