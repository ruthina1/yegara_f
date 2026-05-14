const express = require('express');
const pool = require('../config/db');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/courses
 * List all courses with average rating and total ratings
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT 
        c.*,
        COALESCE(ROUND(AVG(r.rating), 1), 0) AS averageRating,
        COUNT(r.id) AS totalRatings
      FROM courses c
      LEFT JOIN ratings r ON c.id = r.course_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses.' });
  }
});

/**
 * GET /api/courses/:id
 * Get a single course with its content
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Get course
    const [courses] = await pool.query(`
      SELECT 
        c.*,
        COALESCE(ROUND(AVG(r.rating), 1), 0) AS averageRating,
        COUNT(r.id) AS totalRatings
      FROM courses c
      LEFT JOIN ratings r ON c.id = r.course_id
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    const course = courses[0];

    // Get course content
    const [content] = await pool.query(
      'SELECT * FROM course_content WHERE course_id = ? ORDER BY order_index ASC',
      [id]
    );

    course.content = content;

    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Failed to fetch course.' });
  }
});

/**
 * POST /api/courses
 * Create a new course (admin only)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { title, description, thumbnail_url, category } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO courses (title, description, thumbnail_url, category) VALUES (?, ?, ?, ?)',
      [title, description || null, thumbnail_url || null, category || null]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      thumbnail_url,
    });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Failed to create course.' });
  }
});

/**
 * PUT /api/courses/:id
 * Update a course (admin only)
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { id } = req.params;
    const { title, description, thumbnail_url } = req.body;

    const updateTitle = title || null;
    const updateDescription = description || null;
    const updateThumbnail = thumbnail_url || null;

    const [result] = await pool.query(
      'UPDATE courses SET title = COALESCE(?, title), description = COALESCE(?, description), thumbnail_url = COALESCE(?, thumbnail_url) WHERE id = ?',
      [updateTitle, updateDescription, updateThumbnail, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.json({ message: 'Course updated successfully.' });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course.' });
  }
});

/**
 * DELETE /api/courses/:id
 * Delete a course (admin only)
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM courses WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.json({ message: 'Course deleted successfully.' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course.' });
  }
});

module.exports = router;
