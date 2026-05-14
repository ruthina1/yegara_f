const axios = require('axios');

async function testUpdate() {
  try {
    // 1. Login to get token
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@yegara.com',
      password: 'admin1234'
    });
    const token = loginRes.data.token;

    // 2. Get news to find an ID
    const newsRes = await axios.get('http://localhost:5000/api/news');
    const newsId = newsRes.data[0].id;

    console.log(`Attempting to update news ID: ${newsId}`);

    // 3. Try to update
    const updateRes = await axios.put(`http://localhost:5000/api/news/${newsId}`, {
      title: 'Test Update Title',
      content: 'Test content updated',
      date: '2026-05-14',
      imageUrls: []
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Update result:', updateRes.data);
  } catch (err) {
    console.error('Error during update:', err.response?.data || err.message);
  }
}

testUpdate();
