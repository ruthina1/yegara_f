const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'yegara_lms'
  });

  const [rows] = await conn.query('SELECT id, content_text, video_url FROM chapters');
  
  for (const row of rows) {
    let updated = false;
    let newContentText = row.content_text;
    let newVideoUrl = row.video_url;

    if (newContentText && newContentText.includes('sample-videos.com')) {
      newContentText = newContentText.replace(/https:\/\/sample-videos\.com\/[^"]+\.mp4/g, 'https://www.youtube.com/watch?v=LXb3EKWsInQ');
      updated = true;
    }

    if (newVideoUrl && newVideoUrl.includes('sample-videos.com')) {
      newVideoUrl = newVideoUrl.replace(/https:\/\/sample-videos\.com\/[^\s]+\.mp4/g, 'https://www.youtube.com/watch?v=LXb3EKWsInQ');
      updated = true;
    }

    if (updated) {
      await conn.query('UPDATE chapters SET content_text = ?, video_url = ? WHERE id = ?', [newContentText, newVideoUrl, row.id]);
    }
  }

  console.log('Updated chapter videos!');
  process.exit(0);
}

run();
