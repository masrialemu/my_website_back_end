const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
require('dotenv').config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID; // Your Imgur API Client ID
const { authenticateToken, isAdmin } = require('../Database/Token'); // Adjust the import path as needed
const contentModel = require('../Database/Content'); // Adjust the import path as needed

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a POST route to add new content and upload an image to Imgur
router.post('/content', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const { c1, c2, c3, c4, cv, desc } = req.body;

    // Upload the image to Imgur if an image is provided
    let imageLink = null;
    if (file) {
      const formData = new FormData();
      formData.append('image', file.buffer, { filename: 'image' });

      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
        },
      });

      imageLink = response.data.data.link;
    }

    // Create a new content instance with Imgur image link
    const newContent = new contentModel({
      c1,
      c2,
      c3,
      c4,
      cv,
      desc,
      image: imageLink,
    });

    // Save the new content entry to the database
    await newContent.save();

    res.status(201).json({ message: 'Content uploaded and saved to the database.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
