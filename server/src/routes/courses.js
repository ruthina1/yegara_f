const express = require('express');
const pool = require('../config/db');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/courses
 * List all courses with average rating, total ratings, and chapter count
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT 
        c.*,
        COALESCE(ROUND(AVG(r.rating), 1), 0) AS averageRating,
        COUNT(DISTINCT r.id) AS totalRatings,
        (SELECT COUNT(*) FROM chapters ch WHERE ch.course_id = c.id) AS chapterCount
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
 * Get a single course with its chapters
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await pool.query(`
      SELECT 
        c.*,
        COALESCE(ROUND(AVG(r.rating), 1), 0) AS averageRating,
        COUNT(DISTINCT r.id) AS totalRatings
      FROM courses c
      LEFT JOIN ratings r ON c.id = r.course_id
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    const course = courses[0];

    // Get chapters
    const [chapters] = await pool.query(
      'SELECT * FROM chapters WHERE course_id = ? ORDER BY order_index ASC',
      [id]
    );

    // Parse content_images JSON for each chapter
    course.chapters = chapters.map(ch => ({
      ...ch,
      content_images: ch.content_images ? (typeof ch.content_images === 'string' ? JSON.parse(ch.content_images) : ch.content_images) : []
    }));

    // Also get legacy course_content if any
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
 * Create a new course with chapters (admin only)
 */
router.post('/', authenticate, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { title, description, thumbnail_url, category, chapters } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    await connection.beginTransaction();

    // Insert course
    const [result] = await connection.query(
      'INSERT INTO courses (title, description, thumbnail_url, category) VALUES (?, ?, ?, ?)',
      [title, description || null, thumbnail_url || null, category || null]
    );

    const courseId = result.insertId;

    // Insert chapters if provided
    if (chapters && chapters.length > 0) {
      for (let i = 0; i < chapters.length; i++) {
        const ch = chapters[i];
        const imagesJson = ch.content_images && ch.content_images.length > 0 
          ? JSON.stringify(ch.content_images) 
          : null;

        await connection.query(
          'INSERT INTO chapters (course_id, chapter_name, content_text, content_images, video_url, order_index) VALUES (?, ?, ?, ?, ?, ?)',
          [courseId, ch.chapter_name, ch.content_text, imagesJson, ch.video_url || null, i]
        );
      }
    }

    await connection.commit();

    res.status(201).json({
      id: courseId,
      title,
      description,
      thumbnail_url,
      category,
      chapterCount: chapters ? chapters.length : 0,
    });
  } catch (err) {
    await connection.rollback();
    console.error('Error creating course:', err);
    res.status(500).json({ error: `Failed to create course: ${err.message}` });
  } finally {
    connection.release();
  }
});

/**
 * PUT /api/courses/:id
 * Update a course and its chapters (admin only)
 */
router.put('/:id', authenticate, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { id } = req.params;
    const { title, description, thumbnail_url, category, chapters } = req.body;

    await connection.beginTransaction();

    // Update course metadata
    const updateTitle = title || null;
    const updateDescription = description || null;
    const updateThumbnail = thumbnail_url || null;
    const updateCategory = category || null;

    const [result] = await connection.query(
      'UPDATE courses SET title = COALESCE(?, title), description = COALESCE(?, description), thumbnail_url = COALESCE(?, thumbnail_url), category = COALESCE(?, category) WHERE id = ?',
      [updateTitle, updateDescription, updateThumbnail, updateCategory, id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Replace chapters if provided
    if (chapters !== undefined) {
      await connection.query('DELETE FROM chapters WHERE course_id = ?', [id]);

      if (chapters && chapters.length > 0) {
        for (let i = 0; i < chapters.length; i++) {
          const ch = chapters[i];
          const imagesJson = ch.content_images && ch.content_images.length > 0 
            ? JSON.stringify(ch.content_images) 
            : null;

          await connection.query(
            'INSERT INTO chapters (course_id, chapter_name, content_text, content_images, video_url, order_index) VALUES (?, ?, ?, ?, ?, ?)',
            [id, ch.chapter_name, ch.content_text, imagesJson, ch.video_url || null, i]
          );
        }
      }
    }

    await connection.commit();
    res.json({ message: 'Course updated successfully.' });
  } catch (err) {
    await connection.rollback();
    console.error('Error updating course:', err);
    res.status(500).json({ error: `Failed to update course: ${err.message}` });
  } finally {
    connection.release();
  }
});

/**
 * DELETE /api/courses/:id
 * Delete a course (admin only) — chapters cascade automatically
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
