const express = require('express');
const router = express.Router();
const standingsController = require('../controllers/standingsController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/league/:league/:season', standingsController.getLeagueStandings);  // Removed 'standings' from path

// Admin routes
router.get('/admin/standings/:league/:season', authMiddleware, adminMiddleware, standingsController.getAdminLeagueStandings);
router.put('/admin/standings/:league/:season', authMiddleware, adminMiddleware, standingsController.updateLeagueStandings);

module.exports = router;