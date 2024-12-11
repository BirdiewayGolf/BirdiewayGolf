const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const tournamentController = require('../controllers/tournamentController');
const standingsController = require('../controllers/standingsController');
const registrationController = require('../controllers/registrationController');

// Apply auth middleware to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Tournament management
router.get('/tournaments', tournamentController.getAllTournaments);
router.post('/tournaments', tournamentController.createTournament);
router.get('/tournaments/:id', tournamentController.getTournament);
router.put('/tournaments/:id', tournamentController.updateTournament);
router.delete('/tournaments/:id', tournamentController.deleteTournament);
router.patch('/tournaments/:id/status', adminController.updateTournamentStatus);
router.get('/tournaments/:id/report', adminController.getTournamentReport);

// Registration management
router.get('/registrations', registrationController.getAllRegistrations);
router.get('/registrations/tournament/:tournamentId', registrationController.getByTournament);
router.put('/registrations/:id', adminController.manageRegistration);

// Standings management
router.get('/standings/:league/:season', standingsController.getAdminLeagueStandings);
router.put('/standings/:league/:season', standingsController.updateLeagueStandings);

// Contact management
router.put('/contact/:id', adminController.handleContact);

module.exports = router;