const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes
router.get('/verify', authMiddleware, authController.verifyToken);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;