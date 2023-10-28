const jwt = require('jsonwebtoken');
require('dotenv/config')

const secretKey = process.env.Jwt;

// Middleware to verify the authentication token
function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  const tokenParts = authHeader.split(' ');
  const tokenValue = tokenParts[1];

  try {
    const decoded = jwt.verify(tokenValue, secretKey);
    req.user = decoded;
    console.log('Token decoded:', decoded); // Add this line for debugging
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Add this line for debugging
    res.status(401).json({ error: 'Access denied. Invalid token.' });
  }
}

// Middleware to check if the user has admin privileges
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }
}

module.exports = { authenticateToken, isAdmin };
