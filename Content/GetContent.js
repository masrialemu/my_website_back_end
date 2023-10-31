const express = require('express');
const router = express.Router();
require('dotenv').config();
const contentModel = require('../Database/Content'); // Adjust the import path as needed


router.get('/content', async (req, res) => {
    try {
      // Fetch all content data from the MongoDB database
      const contentData = await contentModel.find();
  
      // Respond with the fetched content data
      res.status(200).json(contentData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  });
  
  // Export the router
module.exports = router;
  