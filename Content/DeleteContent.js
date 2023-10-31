const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../Database/Token'); // Adjust the import path as needed
const contentModel = require('../Database/Content'); // Adjust the import path as needed

// DELETE route to remove content by _id
router.delete('/content/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Use the deleteOne method to remove the content entry by its _id
    const result = await contentModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.status(204).end(); // 204 means "No Content" (successful deletion)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
