/**
 * Database Initialization Script
 * Run: npm run db:init
 * 
 * Creates the yegara_lms database, all tables, and seeds initial data.
 */
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'yegara_lms';

async function init() {
  // Connect without specifying a database first
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('🔌 Connected to MySQL server');

  // ── Create Database ──
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.query(`USE \`${DB_NAME}\``);
  console.log(`📦 Using database: ${DB_NAME}`);

  // ── Create Tables ──
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: users');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      thumbnail_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: courses');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS course_content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      course_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      content_type ENUM('video', 'quiz', 'pdf') DEFAULT 'video',
      content_url VARCHAR(500),
      order_index INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: course_content');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      course_id INT NOT NULL,
      content_id INT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      progress_percentage INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_progress (user_id, course_id, content_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (content_id) REFERENCES course_content(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: progress');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      course_id INT NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_rating (user_id, course_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: ratings');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      image_urls JSON,
      created_by INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: news');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: contact_messages');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS saved_courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      course_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_save (user_id, course_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);
  console.log('✅ Table: saved_courses');

  // ── Seed Data ──
  console.log('\n🌱 Seeding initial data...');

  // Admin user
  const adminPassword = await bcrypt.hash('admin1234', 10);
  await connection.query(`
    INSERT IGNORE INTO users (name, email, password, role)
    VALUES ('Yegara Admin', 'admin@yegara.com', ?, 'admin')
  `, [adminPassword]);
  console.log('   👤 Admin user created (admin@yegara.com / admin1234)');

  // Demo user
  const demoPassword = await bcrypt.hash('demo1234', 10);
  await connection.query(`
    INSERT IGNORE INTO users (name, email, password, role)
    VALUES ('Demo Student', 'demo@yegara.com', ?, 'user')
  `, [demoPassword]);
  console.log('   👤 Demo user created (demo@yegara.com / demo1234)');

  // Courses
  const [existingCourses] = await connection.query('SELECT COUNT(*) as count FROM courses');
  if (existingCourses[0].count === 0) {
    await connection.query(`
      INSERT INTO courses (title, description, thumbnail_url) VALUES
      ('Leadership Fundamentals', 'Master the core principles of effective leadership. Learn how to inspire teams, make strategic decisions, and drive organizational success.', NULL),
      ('Advanced React Development', 'Build modern web applications with React. Covers hooks, state management, routing, and performance optimization techniques.', NULL),
      ('Business Strategy & Growth', 'Learn proven strategies for business growth and market expansion. Covers competitive analysis, scaling, and innovation frameworks.', NULL),
      ('Node.js Backend Mastery', 'Design and build scalable server-side applications with Node.js, Express, and database integration patterns.', NULL),
      ('Design Thinking Workshop', 'Apply human-centered design principles to solve complex problems. Learn empathy mapping, prototyping, and iteration.', NULL),
      ('Financial Leadership', 'Understand financial statements, budgeting, and investment strategies for business leaders and entrepreneurs.', NULL)
    `);
    console.log('   📚 6 courses seeded');

    // Course content for each course
    const courseContents = [
      // Course 1: Leadership Fundamentals
      { courseId: 1, items: [
        { title: 'Introduction to Leadership', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 1 },
        { title: 'Leadership Styles & Models', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', order: 2 },
        { title: 'Team Building Strategies', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 3 },
        { title: 'Leadership Assessment Quiz', type: 'quiz', url: 'https://docs.google.com/forms/d/e/example/viewform', order: 4 },
      ]},
      // Course 2: Advanced React
      { courseId: 2, items: [
        { title: 'React Hooks Deep Dive', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 1 },
        { title: 'State Management with Context', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', order: 2 },
        { title: 'React Router & Navigation', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 3 },
        { title: 'React Fundamentals Quiz', type: 'quiz', url: 'https://docs.google.com/forms/d/e/example/viewform', order: 4 },
      ]},
      // Course 3: Business Strategy
      { courseId: 3, items: [
        { title: 'Market Analysis Fundamentals', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 1 },
        { title: 'Competitive Advantage Framework', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', order: 2 },
        { title: 'Growth Strategies', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 3 },
      ]},
      // Course 4: Node.js Backend
      { courseId: 4, items: [
        { title: 'Express.js Fundamentals', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 1 },
        { title: 'Database Integration', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', order: 2 },
        { title: 'REST API Design', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 3 },
        { title: 'Backend Quiz', type: 'quiz', url: 'https://docs.google.com/forms/d/e/example/viewform', order: 4 },
      ]},
      // Course 5: Design Thinking
      { courseId: 5, items: [
        { title: 'Empathy & User Research', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 1 },
        { title: 'Ideation & Prototyping', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', order: 2 },
        { title: 'Design Principles Quiz', type: 'quiz', url: 'https://docs.google.com/forms/d/e/example/viewform', order: 3 },
      ]},
      // Course 6: Financial Leadership
      { courseId: 6, items: [
        { title: 'Reading Financial Statements', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 1 },
        { title: 'Budgeting & Forecasting', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', order: 2 },
        { title: 'Investment Strategy', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', order: 3 },
        { title: 'Finance Assessment', type: 'quiz', url: 'https://docs.google.com/forms/d/e/example/viewform', order: 4 },
      ]},
    ];

    for (const course of courseContents) {
      for (const item of course.items) {
        await connection.query(
          'INSERT INTO course_content (course_id, title, content_type, content_url, order_index) VALUES (?, ?, ?, ?, ?)',
          [course.courseId, item.title, item.type, item.url, item.order]
        );
      }
    }
    console.log('   📄 Course content seeded');
  } else {
    console.log('   ⏭️  Courses already exist, skipping seed');
  }

  // Seed a welcome news article
  const [existingNews] = await connection.query('SELECT COUNT(*) as count FROM news');
  if (existingNews[0].count === 0) {
    await connection.query(`
      INSERT INTO news (title, content, date) VALUES
      ('Welcome to Yegara LMS', 'We are excited to announce the launch of our new Learning Management System portal. Check our courses and start learning today.', CURDATE()),
      ('New Courses Available', 'We have just added 6 new professional development courses covering Leadership, React Development, Business Strategy, Node.js, Design Thinking, and Financial Leadership.', CURDATE())
    `);
    console.log('   📰 News articles seeded');
  }

  console.log('\n🎉 Database initialization complete!\n');
  await connection.end();
  process.exit(0);
}

init().catch((err) => {
  console.error('❌ Initialization failed:', err);
  process.exit(1);
});
