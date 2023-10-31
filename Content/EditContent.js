const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
require('dotenv').config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
const { authenticateToken, isAdmin } = require('../Database/Token');
const contentModel = require('../Database/Content'); // Adjust the import path as needed

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a PUT route to update a specific content entry, including image upload to Imgur
router.put('/content/:public_id', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { public_id } = req.params; // Extract the public_id from the request parameters
    const { c1, c2, c3, c4, cv, desc } = req.body;

    // Find the content entry by its public_id
    const content = await contentModel.findOne({ public_id });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Upload the new image to Imgur if an image is provided
    if (req.file) {
      const formData = new FormData();
      formData.append('image', req.file.buffer, { filename: 'image' });

      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
        },
      });

      content.image = response.data.data.link;
    }

    // Update other content properties
    content.c1 = c1;
    content.c2 = c2;
    content.c3 = c3;
    content.c4 = c4;
    content.cv = cv;
    content.desc = desc;

    // Save the updated content to the database
    await content.save();

    res.status(200).json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Export the router
module.exports = router;
