const express = require('express');
const pool = require('../config/db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/contact
 * Submit a contact message (public)
 */
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || null, message]
    );

    res.status(201).json({ message: 'Message sent successfully. We will get back to you soon.' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

/**
 * GET /api/contact
 * Get all contact messages (admin only)
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

module.exports = router;
