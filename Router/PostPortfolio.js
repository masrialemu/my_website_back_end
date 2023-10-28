const express = require('express');
const App = express.Router();
const data = require('../Database/Port');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const storage = multer.memoryStorage();
const upload = multer({ storage });
require('dotenv/config')


const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
const { authenticateToken, isAdmin } = require('./../Database/Token');

App.post('/project',authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const { title, video, github, live, desc } = req.body;

    // Upload the image to Imgur if an image is provided
    let imageLink = null;
    if (file) {
      const formData = new FormData();
      formData.append('image', file.buffer, { filename: 'image' }); // Use file.buffer directly

      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
        },
      });

      imageLink = response.data.data.link;
    }

    // Save the data (including the image link if available) to your database
    const portfolio = new data({
      title,
      video,
      github,
      live,
      desc,
      image: imageLink,
    });
    await portfolio.save();

    res.status(201).json({ message: 'Data uploaded and saved to the database.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = App;
