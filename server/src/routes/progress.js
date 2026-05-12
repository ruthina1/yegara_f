const express = require('express');
const pool = require('../config/db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/progress/:courseId
 * Get user's progress for all content in a course
 */
router.get('/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const [rows] = await pool.query(
      'SELECT * FROM progress WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to fetch progress.' });
  }
});

/**
 * POST /api/progress
 * Create or update progress for a specific content item
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { courseId, contentId, completed, progressPercentage } = req.body;
    const userId = req.user.id;

    if (!courseId || !contentId) {
      return res.status(400).json({ error: 'courseId and contentId are required.' });
    }

    // Upsert progress
    await pool.query(`
      INSERT INTO progress (user_id, course_id, content_id, completed, progress_percentage)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        completed = VALUES(completed),
        progress_percentage = VALUES(progress_percentage)
    `, [userId, courseId, contentId, completed || false, progressPercentage || 0]);

    res.json({ message: 'Progress updated successfully.' });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Failed to update progress.' });
  }
});

module.exports = router;
