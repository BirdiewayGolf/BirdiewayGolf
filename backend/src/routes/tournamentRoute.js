const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Tournament routes
router.post('/tournaments', tournamentController.createTournament);
router.get('/tournaments', tournamentController.getAllTournaments);
router.get('/tournaments/:id', tournamentController.getTournament);
router.put('/tournaments/:id', tournamentController.updateTournament);
router.delete('/tournaments/:id', tournamentController.deleteTournament);
router.patch('/tournaments/:id/status', tournamentController.updateTournamentStatus);
router.get('/tournaments/:id/registrations/count', tournamentController.getTournamentRegistrationsCount);

module.exports = router;