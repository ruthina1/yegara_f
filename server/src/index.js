const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const ratingRoutes = require('./routes/ratings');
const newsRoutes = require('./routes/news');
const contactRoutes = require('./routes/contact');
const savedRoutes = require('./routes/saved');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Middleware ──
// Set security HTTP headers
app.use(helmet());

// Rate Limiting: Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

// ── Standard Middleware ──
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser()); // Parse cookies

// ── Data Sanitization ──
// Data sanitization against XSS
app.use(xss());
// Prevent HTTP Parameter Pollution
app.use(hpp());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ── API Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/saved', savedRoutes);

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Yegara LMS API',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ──
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global Error Handler ──
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║         🚀 Yegara LMS API Server            ║
╠══════════════════════════════════════════════╣
║  Status:  Running                            ║
║  Port:    ${PORT}                                ║
║  API:     http://localhost:${PORT}/api            ║
║  Health:  http://localhost:${PORT}/api/health     ║
╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
