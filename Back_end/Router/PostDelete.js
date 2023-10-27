const express = require('express');
const App = express.Router();
const data = require('./../Database/Data');
const { authenticateToken, isAdmin } = require('./../Database/Token');

// Create a delete route
App.delete('/project/:id',authenticateToken, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await data.findByIdAndRemove(id);

    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found.' });
    }

    res.json({ message: 'Data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = App;
