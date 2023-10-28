const express = require('express');
const App = express.Router();
const Skill = require('./../Database/Skill'); // Import your Skill model
const { authenticateToken, isAdmin } = require('./../Database/Token');
// DELETE route to remove a skill by its ID
App.delete('/skill/:id',authenticateToken, isAdmin, async (req, res) => {
  try {
    const skillId = req.params.id;

    // Check if the skill with the specified ID exists
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    // If the skill exists, remove it from the database
    await Skill.findByIdAndRemove(skillId);

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = App;
