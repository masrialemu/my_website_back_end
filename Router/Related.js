const express = require('express');
const App = express.Router();
const data = require('./../Database/Port');

// GET route to fetch the latest 3 posts
App.get('/project', async (req, res) => {
  try {
    const latestData = await data.find().limit(3).sort({ createdAt: -1 }); // Sort by createdAt in descending order to get the latest posts.
    res.status(200).json(latestData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = App;
