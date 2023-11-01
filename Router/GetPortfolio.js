const express = require('express');
const App = express.Router();
const data = require('./../Database/Port');

// GET route to fetch all data in reverse order
App.get('/project', async (req, res) => {
  try {
    const allData = await data.find();

    // Reverse the order of the data array
    const reversedData = allData.reverse();

    res.status(200).json(reversedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = App;
