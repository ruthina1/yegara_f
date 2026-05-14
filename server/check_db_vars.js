const pool = require('./src/config/db');

async function checkVars() {
  try {
    const [rows] = await pool.query("SHOW VARIABLES LIKE 'max_allowed_packet'");
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkVars();
