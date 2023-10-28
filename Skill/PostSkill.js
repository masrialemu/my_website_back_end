const express = require('express');
const App = express.Router();
const Skill = require('./../Database/Skill'); // Import your Skill model
const { authenticateToken, isAdmin } = require('./../Database/Token');
// POST route to add a new skill (requires authentication token and admin privileges)
App.post('/skill', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, value } = req.body;

    // Create a new skill document using the Skill model
    const newSkill = new Skill({
      name,
      value,
    });

    // Save the new skill document to the database
    await newSkill.save();

    res.status(201).json({ message: 'Skill added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = App;
