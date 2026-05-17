const mysql = require('mysql2/promise');
require('dotenv').config();
async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'yegara_lms'
  });
  await conn.query("UPDATE course_content SET content_url = 'https://www.youtube.com/watch?v=LXb3EKWsInQ' WHERE content_type = 'video'");
  console.log('Updated videos!');
  process.exit(0);
}
run();
