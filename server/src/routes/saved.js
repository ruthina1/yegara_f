const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticate } = require('../middleware/auth');

// Get all saved courses for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, 
        (SELECT AVG(rating) FROM ratings WHERE course_id = c.id) as averageRating,
        (SELECT COUNT(*) FROM ratings WHERE course_id = c.id) as totalRatings,
        (SELECT COUNT(*) FROM chapters WHERE course_id = c.id) as chapterCount
       FROM saved_courses sc
       JOIN courses c ON sc.course_id = c.id
       WHERE sc.user_id = ?
       ORDER BY sc.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching saved courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save a course
router.post('/:courseId', authenticate, async (req, res) => {
  const { courseId } = req.params;
  try {
    await pool.query(
      'INSERT IGNORE INTO saved_courses (user_id, course_id) VALUES (?, ?)',
      [req.user.id, courseId]
    );
    res.json({ success: true, message: 'Course saved' });
  } catch (error) {
    console.error('Error saving course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unsave a course
router.delete('/:courseId', authenticate, async (req, res) => {
  const { courseId } = req.params;
  try {
    await pool.query(
      'DELETE FROM saved_courses WHERE user_id = ? AND course_id = ?',
      [req.user.id, courseId]
    );
    res.json({ success: true, message: 'Course removed from saved' });
  } catch (error) {
    console.error('Error unsaving course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if a course is saved
router.get('/check/:courseId', authenticate, async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT id FROM saved_courses WHERE user_id = ? AND course_id = ?',
      [req.user.id, courseId]
    );
    res.json({ isSaved: rows.length > 0 });
  } catch (error) {
    console.error('Error checking saved status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
