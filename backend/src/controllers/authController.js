const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hardcoded admin credentials with IDs
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

const authController = {
  // Login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Input validation
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      const user = adminUsers.find(u => u.username === username);

      if (!user || password !== user.password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  // Verify token and get user info
  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = adminUsers.find(u => u.id === decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            username: user.username
          }
        }
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired'
        });
      }

      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  },

  // Logout - just a success response since we handle token removal on frontend
  async logout(req, res) {
    try {
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during logout'
      });
    }
  }
};

module.exports = authController;