const express = require('express');
const router = express.Router();
const User = require('../Database/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config')

const secretKey = process.env.Jwt;
// Login route
router.post('/',async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    // Create a payload with user's ID and admin status
    const payload = {
      userId: user._id,
      isAdmin: user.admin // Include the admin status in the payload
    };

    // Create a JWT token with the payload
    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', token, userId: user._id, isAdmin: user.admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
