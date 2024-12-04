// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hardcoded admin credentials with IDs
const adminUsers = [
  {
    id: '1',  // Added ID
    username: "pokesgolf",
    password: "birdieway22!"
  },
  {
    id: '2',  // Added ID
    username: "birdiewayadmin789!",
    password: "downthemiddle14"
  },
  {
    id: '3',  // Added ID
    username: "birdiewayadmin987!",
    password: "drainingputts18"
  }
];

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find admin user
    const user = adminUsers.find(u => u.username === username);
    
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with userId
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { 
        id: user.id,
        username: user.username 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};