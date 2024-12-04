// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');

// Reference to the same admin users
const adminUsers = [
  {
    id: '1',
    username: "pokesgolf",
    password: "birdieway22!"
  },
  {
    id: '2',
    username: "birdiewayadmin789!",
    password: "downthemiddle14"
  },
  {
    id: '3',
    username: "birdiewayadmin987!",
    password: "drainingputts18"
  }
];

const auth = async (req, res, next) => {
  try {
    // Get token from header and verify format
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader); // Debug log

    if (!authHeader) {
      console.log('No auth header provided');
      return res.status(401).json({ 
        message: 'No auth token provided',
        clearToken: true
      });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      console.log('Invalid token format');
      return res.status(401).json({ 
        message: 'Invalid token format',
        clearToken: true
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug log

    // Find user from hardcoded admins
    const user = adminUsers.find(u => u.id === decoded.userId);
    console.log('Found user:', user ? 'Yes' : 'No'); // Debug log

    if (!user) {
      console.log('User not found for ID:', decoded.userId);
      return res.status(401).json({ 
        message: 'User not found. Please login again.',
        clearToken: true
      });
    }

    // Attach user to request (exclude password)
    req.user = {
      _id: user.id,
      username: user.username
    };
    req.token = token;
    
    console.log('Authentication successful for user:', user.username);
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token. Please login again.',
        clearToken: true
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired. Please login again.',
        clearToken: true
      });
    }

    return res.status(401).json({ 
      message: 'Authentication failed. Please login again.',
      clearToken: true
    });
  }
};

module.exports = auth;