const express = require('express');
const App = express.Router();
const data = require('./../Database/Port');

App.get('/project/:id', async (req, res) => {
    const projectId = req.params.id;
  
    try {
      const project = await data.findById(projectId);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  });

  module.exports = App;