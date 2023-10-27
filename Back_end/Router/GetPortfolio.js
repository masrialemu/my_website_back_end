// Import necessary modules
const express = require('express');
const App = express.Router();
const data = require('./../Database/Port');

// GET route to fetch all data
App.get('/project', async (req, res) => {
  try {
    const allData = await data.find();
    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Error handling middleware
App.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error.' });
});

module.exports = App;
