const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'yegara_lms'
  });

  try {
    console.log('🔌 MySQL connected successfully');
    
    // Check if column exists
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'courses' AND COLUMN_NAME = 'category'
    `, [process.env.DB_NAME || 'yegara_lms']);

    if (columns.length === 0) {
      await connection.query(`
        ALTER TABLE courses ADD COLUMN category VARCHAR(100) AFTER thumbnail_url
      `);
      console.log('✅ Column "category" added to "courses" table');
    } else {
      console.log('ℹ️ Column "category" already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();
