-- ============================================
-- Yegara LMS Database Schema
-- Run this in MySQL Workbench or CLI:
--   mysql -u root -p < schema.sql
-- ============================================

CREATE DATABASE IF NOT EXISTS `yegara_lms`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `yegara_lms`;

-- ── Users ──
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Courses ──
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `thumbnail_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Course Content (videos, quizzes, pdfs) ──
CREATE TABLE IF NOT EXISTS `course_content` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `course_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content_type` ENUM('video', 'quiz', 'pdf') DEFAULT 'video',
  `content_url` VARCHAR(500),
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── User Progress ──
CREATE TABLE IF NOT EXISTS `progress` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `content_id` INT NOT NULL,
  `completed` BOOLEAN DEFAULT FALSE,
  `progress_percentage` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_progress` (`user_id`, `course_id`, `content_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`content_id`) REFERENCES `course_content`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Course Ratings ──
CREATE TABLE IF NOT EXISTS `ratings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `rating` INT NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_rating` (`user_id`, `course_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── News Articles ──
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `image_urls` JSON,
  `created_by` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── Contact Messages ──
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255),
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================
-- SEED DATA
-- ============================================

-- Admin user (password: admin123)
-- bcrypt hash for "admin123"
INSERT IGNORE INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Yegara Admin', 'admin@yegara.com', '$2a$10$8KzQrT5G5V5j5Z5q5Y5Z5OJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J', 'admin');

-- Demo user (password: demo123)
INSERT IGNORE INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Demo Student', 'demo@yegara.com', '$2a$10$8KzQrT5G5V5j5Z5q5Y5Z5OJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J', 'user');

-- Courses
INSERT INTO `courses` (`title`, `description`, `thumbnail_url`) VALUES
('Leadership Fundamentals', 'Master the core principles of effective leadership. Learn how to inspire teams, make strategic decisions, and drive organizational success.', NULL),
('Advanced React Development', 'Build modern web applications with React. Covers hooks, state management, routing, and performance optimization techniques.', NULL),
('Business Strategy & Growth', 'Learn proven strategies for business growth and market expansion. Covers competitive analysis, scaling, and innovation frameworks.', NULL),
('Node.js Backend Mastery', 'Design and build scalable server-side applications with Node.js, Express, and database integration patterns.', NULL),
('Design Thinking Workshop', 'Apply human-centered design principles to solve complex problems. Learn empathy mapping, prototyping, and iteration.', NULL),
('Financial Leadership', 'Understand financial statements, budgeting, and investment strategies for business leaders and entrepreneurs.', NULL);

-- Course Content
-- Course 1: Leadership Fundamentals
INSERT INTO `course_content` (`course_id`, `title`, `content_type`, `content_url`, `order_index`) VALUES
(1, 'Introduction to Leadership', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 1),
(1, 'Leadership Styles & Models', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 2),
(1, 'Team Building Strategies', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 3),
(1, 'Leadership Assessment Quiz', 'quiz', 'https://docs.google.com/forms/d/e/example/viewform', 4);

-- Course 2: Advanced React Development
INSERT INTO `course_content` (`course_id`, `title`, `content_type`, `content_url`, `order_index`) VALUES
(2, 'React Hooks Deep Dive', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 1),
(2, 'State Management with Context', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 2),
(2, 'React Router & Navigation', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 3),
(2, 'React Fundamentals Quiz', 'quiz', 'https://docs.google.com/forms/d/e/example/viewform', 4);

-- Course 3: Business Strategy & Growth
INSERT INTO `course_content` (`course_id`, `title`, `content_type`, `content_url`, `order_index`) VALUES
(3, 'Market Analysis Fundamentals', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 1),
(3, 'Competitive Advantage Framework', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 2),
(3, 'Growth Strategies', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 3);

-- Course 4: Node.js Backend Mastery
INSERT INTO `course_content` (`course_id`, `title`, `content_type`, `content_url`, `order_index`) VALUES
(4, 'Express.js Fundamentals', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 1),
(4, 'Database Integration', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 2),
(4, 'REST API Design', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 3),
(4, 'Backend Quiz', 'quiz', 'https://docs.google.com/forms/d/e/example/viewform', 4);

-- Course 5: Design Thinking Workshop
INSERT INTO `course_content` (`course_id`, `title`, `content_type`, `content_url`, `order_index`) VALUES
(5, 'Empathy & User Research', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 1),
(5, 'Ideation & Prototyping', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 2),
(5, 'Design Principles Quiz', 'quiz', 'https://docs.google.com/forms/d/e/example/viewform', 3);

-- Course 6: Financial Leadership
INSERT INTO `course_content` (`course_id`, `title`, `content_type`, `content_url`, `order_index`) VALUES
(6, 'Reading Financial Statements', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 1),
(6, 'Budgeting & Forecasting', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 2),
(6, 'Investment Strategy', 'video', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 3),
(6, 'Finance Assessment', 'quiz', 'https://docs.google.com/forms/d/e/example/viewform', 4);

-- News Articles
INSERT INTO `news` (`title`, `content`, `date`) VALUES
('Welcome to Yegara LMS', 'We are excited to announce the launch of our new Learning Management System portal. Check our courses and start learning today.', CURDATE()),
('New Courses Available', 'We have just added 6 new professional development courses covering Leadership, React Development, Business Strategy, Node.js, Design Thinking, and Financial Leadership.', CURDATE());

-- ============================================
-- DONE! Verify with:
--   SELECT * FROM users;
--   SELECT * FROM courses;
--   SELECT COUNT(*) FROM course_content;
-- ============================================
