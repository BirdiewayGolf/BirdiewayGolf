// backend/src/routes/admin.js
const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const auth = require('../middleware/auth');

// Tournament routes
router.post('/tournaments', auth, tournamentController.createTournament);
router.get('/tournaments', auth, tournamentController.getTournaments);
router.get('/tournaments/:id', auth, tournamentController.getTournament);
router.put('/tournaments/:id', auth, tournamentController.updateTournament);
router.delete('/tournaments/:id', auth, tournamentController.deleteTournament);

// Tournament Registration routes
router.get('/tournaments/:id/registrations', auth, tournamentController.getTournamentRegistrations);

module.exports = router;