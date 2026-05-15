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
    
    // Change thumbnail_url to LONGTEXT to support base64 images
    await connection.query(`
      ALTER TABLE courses MODIFY COLUMN thumbnail_url LONGTEXT
    `);
    console.log('✅ Column "thumbnail_url" modified to LONGTEXT');

    // Change content_text in chapters to LONGTEXT to support large JSON blocks with base64 images
    await connection.query(`
      ALTER TABLE chapters MODIFY COLUMN content_text LONGTEXT
    `);
    console.log('✅ Column "content_text" in chapters modified to LONGTEXT');

    // Also change video_url in chapters just in case, though usually it's just a link
    await connection.query(`
      ALTER TABLE chapters MODIFY COLUMN video_url LONGTEXT
    `);
    console.log('✅ Column "video_url" in chapters modified to LONGTEXT');

    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();
