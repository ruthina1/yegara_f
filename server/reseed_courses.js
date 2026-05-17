
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'yegara_lms',
};

const categories = [
  "Business", "Technology", "Finance", "Leadership", "Marketing", "Personal Development", "Other"
];

const videoUrl = 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4';
const imageUrl = 'https://picsum.photos/800/400';

const generateBlocks = (chapterNum) => {
  // Rotate positions based on chapter number
  if (chapterNum === 1) {
    return [
      { id: Math.random().toString(), type: 'video', value: videoUrl },
      { id: Math.random().toString(), type: 'text', value: '## Chapter Introduction\nWelcome to the first chapter of this course. In this lesson, we will cover the foundational concepts and set the stage for your learning journey.' },
      { id: Math.random().toString(), type: 'image', value: imageUrl + '?sig=' + Math.random() }
    ];
  } else if (chapterNum === 2) {
    return [
      { id: Math.random().toString(), type: 'text', value: '## Core Concepts\nThis chapter dives deep into the technical implementation and strategic frameworks. Pay close attention to the visual guides below.' },
      { id: Math.random().toString(), type: 'image', value: imageUrl + '?sig=' + Math.random() },
      { id: Math.random().toString(), type: 'video', value: videoUrl }
    ];
  } else {
    return [
      { id: Math.random().toString(), type: 'image', value: imageUrl + '?sig=' + Math.random() },
      { id: Math.random().toString(), type: 'video', value: videoUrl },
      { id: Math.random().toString(), type: 'text', value: '## Conclusion & Next Steps\nWrapping up this module, we will review the key takeaways and prepare for the assessment. Make sure you have completed all the practical exercises.' }
    ];
  }
};

async function seed() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database.');

    // 1. Clear existing courses and chapters
    // Note: chapters has a foreign key to courses (usually), 
    // but course_content might also exist. Let's clear everything related.
    await connection.query('DELETE FROM course_content');
    await connection.query('DELETE FROM chapters');
    await connection.query('DELETE FROM courses');
    console.log('Cleared existing course data.');

    for (const cat of categories) {
      for (let i = 1; i <= 2; i++) {
        const title = `${cat} Mastery ${i}`;
        const description = `Become an expert in ${cat} with this comprehensive guide. This course covers everything from basic principles to advanced professional strategies in the field of ${cat.toLowerCase()}.`;
        
        const [courseResult] = await connection.query(
          'INSERT INTO courses (title, description, category, thumbnail_url) VALUES (?, ?, ?, ?)',
          [title, description, cat, imageUrl + '?cat=' + cat + i]
        );
        const courseId = courseResult.insertId;
        console.log(`Created course: ${title} (ID: ${courseId})`);

        for (let j = 1; j <= 3; j++) {
          const chapterName = `Module ${j}: ${cat} Essentials`;
          const blocks = generateBlocks(j);
          const contentText = JSON.stringify(blocks);

          // Extract media for legacy tabs (Visuals, Watch)
          const extractedImages = blocks.filter(b => b.type === 'image' && b.value).map(b => b.value);
          const extractedVideo = blocks.find(b => b.type === 'video' && b.value)?.value || '';

          await connection.query(
            'INSERT INTO chapters (course_id, chapter_name, content_text, content_images, video_url, order_index) VALUES (?, ?, ?, ?, ?, ?)',
            [courseId, chapterName, contentText, JSON.stringify(extractedImages), extractedVideo, j - 1]
          );
        }

        console.log(`   Seeded 3 chapters for ${title}`);
      }
    }

    console.log('\n✅ Reseeding complete!');
  } catch (err) {
    console.error('Error reseeding:', err);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
