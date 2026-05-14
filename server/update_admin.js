const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateAdminPassword() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'yegara_lms'
    });

    const hashedPassword = await bcrypt.hash('admin1234', 10);
    const [result] = await connection.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@yegara.com']
    );

    if (result.affectedRows > 0) {
      console.log('✅ Admin password updated to admin1234');
    } else {
      // If admin doesn't exist, insert it
      const [insertResult] = await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Yegara Admin', 'admin@yegara.com', hashedPassword, 'admin']
      );
      console.log('✅ Admin user created with password admin1234');
    }

    await connection.end();
  } catch (err) {
    console.error('Error updating admin password:', err);
  }
}

updateAdminPassword();
