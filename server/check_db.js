const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'yegara_lms'
  });

  try {
    console.log('--- COURSES TABLE ---');
    const [coursesCols] = await connection.query('DESCRIBE courses');
    console.table(coursesCols);

    console.log('\n--- CHAPTERS TABLE ---');
    const [chaptersCols] = await connection.query('DESCRIBE chapters');
    console.table(chaptersCols);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
