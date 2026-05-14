const pool = require('./src/config/db');

async function migrate() {
  try {
    await pool.query("ALTER TABLE courses ADD COLUMN category VARCHAR(100)");
    console.log('✅ Column "category" added to "courses" table');
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_COLUMN_NAME') {
      console.log('ℹ️ Column "category" already exists');
      process.exit(0);
    }
    console.error(err);
    process.exit(1);
  }
}

migrate();
