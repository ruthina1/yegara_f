const mysql = require('mysql2/promise');
require('dotenv').config({ path: './server/.env' });

async function updateChapterContent() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'yegara_lms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    const [chapters] = await pool.query('SELECT * FROM chapters');
    console.log(`Found ${chapters.length} chapters to update.`);

    for (const chapter of chapters) {
      let content = '';
      if (chapter.chapter_name.toLowerCase().includes('introduction') || chapter.chapter_name.toLowerCase().includes('fundamental')) {
        content = `Welcome to ${chapter.chapter_name}. In this foundational module, we explore the core principles that define this domain. You will learn about the historical context, current industry trends, and the essential frameworks required to succeed. By the end of this chapter, you will have a solid grasp of the basics and be ready for more advanced topics.`;
      } else if (chapter.chapter_name.toLowerCase().includes('advanced') || chapter.chapter_name.toLowerCase().includes('mastery')) {
        content = `This advanced chapter on ${chapter.chapter_name} dives deep into complex implementation strategies. We will analyze real-world case studies, optimize performance metrics, and look at cutting-edge tools that pros use to stay ahead. Be prepared for technical challenges and in-depth discussions on optimization and scaling.`;
      } else if (chapter.chapter_name.toLowerCase().includes('next') || chapter.chapter_name.toLowerCase().includes('part 2')) {
        content = `Following our previous discussion, this chapter on ${chapter.chapter_name} bridges the gap between theory and practice. We focus on building functional prototypes and testing your knowledge in simulated environments. It's time to take what you've learned and apply it to practical scenarios.`;
      } else {
        content = `Detailed lesson on ${chapter.chapter_name}. This module covers specific techniques and methodologies relevant to this topic. We provide step-by-step guides, best practices, and expert tips to help you master these skills effectively. Ensure you go through the visuals tab for supporting diagrams.`;
      }

      await pool.query(
        'UPDATE chapters SET content_text = ? WHERE id = ?',
        [content, chapter.id]
      );
    }

    console.log('Successfully updated all chapter contents with unique data.');
  } catch (err) {
    console.error('Database update failed:', err);
  } finally {
    await pool.end();
  }
}

updateChapterContent();
