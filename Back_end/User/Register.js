const express = require('express');
const router = express.Router();
const User = require('../Database/User'); // Update the path
const bcrypt = require('bcrypt');

// Registration route
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username or email already exist
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return res.status(400).json({ error: 'Username or email already exists.' });
  }

  // Hash the password using bcrypt
  const saltRounds = 10; // You can adjust the number of salt rounds for security
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user with the hashed password
  const newUser = new User({ username, email, password: hashedPassword });

  // Save the user to the database
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
