const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
require('dotenv').config();

const contentModel = require('../Database/Content'); // Adjust the import path as needed

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/content/:public_id', async (req, res) => {
    try {
      const { public_id } = req.params;
  
      // Find the content entry in the database by its public_id
      const content = await contentModel.findOne({ public_id });
  
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      // Return the content entry as a JSON response
      res.status(200).json(content);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Export the router
  module.exports = router;
  