const express = require('express');
const App = express.Router();
const Skill = require('./../Database/Skill'); // Import your Skill model


App.get('/skill', async (req, res) => {
  try {
    const allSkills = await Skill.find();
    res.status(200).json(allSkills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = App;

