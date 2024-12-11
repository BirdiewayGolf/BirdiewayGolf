const express = require('express');
const router = express.Router();

// Import Controllers
const tournamentController = require('../controllers/tournamentController');
const standingsController = require('../controllers/standingsController');

// Tournament Routes
router.get('/tournaments', tournamentController.getPublicTournaments);
router.get('/tournaments/details/:id', tournamentController.getTournamentDetails);
router.get('/tournaments/:league', tournamentController.getTournamentsByLeague);

// Standings Routes
router.get('/standings/league/:league/:season', standingsController.getLeagueStandings);

module.exports = router;