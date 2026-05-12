const express = require('express');
const pool = require('../config/db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/ratings/user/:courseId
 * Get the current user's rating for a specific course
 */
router.get('/user/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const [rows] = await pool.query(
      'SELECT rating FROM ratings WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (rows.length > 0) {
      res.json({ userRating: rows[0].rating });
    } else {
      res.json({ userRating: null });
    }
  } catch (err) {
    console.error('Error fetching user rating:', err);
    res.status(500).json({ error: 'Failed to fetch rating.' });
  }
});

/**
 * POST /api/ratings
 * Submit or update a rating for a course
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { courseId, rating } = req.body;
    const userId = req.user.id;

    if (!courseId || !rating) {
      return res.status(400).json({ error: 'courseId and rating are required.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    // Upsert rating
    await pool.query(`
      INSERT INTO ratings (user_id, course_id, rating)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE rating = VALUES(rating)
    `, [userId, courseId, rating]);

    // Return updated average
    const [stats] = await pool.query(`
      SELECT 
        COALESCE(ROUND(AVG(rating), 1), 0) AS averageRating,
        COUNT(*) AS totalRatings
      FROM ratings WHERE course_id = ?
    `, [courseId]);

    res.json({
      message: 'Rating submitted successfully.',
      averageRating: stats[0].averageRating,
      totalRatings: stats[0].totalRatings,
    });
  } catch (err) {
    console.error('Error submitting rating:', err);
    res.status(500).json({ error: 'Failed to submit rating.' });
  }
});

module.exports = router;
