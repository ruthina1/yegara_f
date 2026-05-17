const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const pool = require('../config/db');
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yegara-trading-lms-super-secret-key-2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    // Check if user already exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    const user = {
      id: result.insertId,
      name,
      email,
      role: 'user',
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie('token', token, cookieOptions);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and return JWT
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find user
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie('token', token, cookieOptions);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/logout
 * Clear authentication cookie
 */
router.post('/logout', (req, res) => {
  res.cookie('token', 'loggedout', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000)
  });
  res.status(200).json({ status: 'success' });
});

/**
 * POST /api/auth/google
 * Google OAuth: Verify Google ID token, find or create user, return JWT
 */
router.post('/google', async (req, res) => {
  try {
    const { credential, access_token } = req.body;

    if (!credential && !access_token) {
      return res.status(400).json({ error: 'Google credential or access token is required.' });
    }

    if (!GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: 'Google OAuth is not configured on the server.' });
    }

    let email, name, googleId, picture;

    if (access_token) {
      // Access Token Flow (Reliable custom button popup)
      const fetch = require('node-fetch') || (await import('node-fetch')).default;
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const data = await response.json();
      
      if (!data || !data.email) {
        return res.status(400).json({ error: 'Invalid Google access token.' });
      }
      
      email = data.email;
      name = data.name;
      googleId = data.sub;
      picture = data.picture;
      
    } else {
      // Original ID Token Flow
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      googleId = payload.sub;
      picture = payload.picture;
    }

    if (!email) {
      return res.status(400).json({ error: 'Email not provided by Google.' });
    }

    // Find or create user
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    let user;

    if (existing.length > 0) {
      user = existing[0];
    } else {
      // Create a new user with a random password (they'll use OAuth to login)
      const randomPassword = await bcrypt.hash(require('crypto').randomBytes(32).toString('hex'), 10);
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name || email.split('@')[0], email, randomPassword, 'user']
      );
      user = {
        id: result.insertId,
        name: name || email.split('@')[0],
        email,
        role: 'user',
      };
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie('token', token, cookieOptions);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Google OAuth error:', err);
    res.status(401).json({ error: 'Invalid Google credential.' });
  }
});

/**
 * POST /api/auth/apple
 * Apple Sign-In: Verify Apple ID token, find or create user, return JWT
 */
router.post('/apple', async (req, res) => {
  try {
    const { id_token, user: appleUser } = req.body;

    if (!id_token) {
      return res.status(400).json({ error: 'Apple ID token is required.' });
    }

    // Decode the Apple JWT (header.payload.signature)
    // In production, you should verify this against Apple's public keys
    const parts = id_token.split('.');
    if (parts.length !== 3) {
      return res.status(400).json({ error: 'Invalid Apple ID token format.' });
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    const { email, sub: appleId } = payload;

    if (!email) {
      return res.status(400).json({ error: 'Email not provided by Apple.' });
    }

    // Find or create user
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    let user;

    if (existing.length > 0) {
      user = existing[0];
    } else {
      // Apple only sends the name on the first authorization
      const userName = appleUser
        ? `${appleUser.name?.firstName || ''} ${appleUser.name?.lastName || ''}`.trim()
        : email.split('@')[0];

      const randomPassword = await bcrypt.hash(require('crypto').randomBytes(32).toString('hex'), 10);
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [userName || email.split('@')[0], email, randomPassword, 'user']
      );
      user = {
        id: result.insertId,
        name: userName || email.split('@')[0],
        email,
        role: 'user',
      };
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie('token', token, cookieOptions);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Apple Sign-In error:', err);
    res.status(401).json({ error: 'Invalid Apple credential.' });
  }
});

module.exports = router;
