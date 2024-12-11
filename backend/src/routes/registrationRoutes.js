const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.post('/', registrationController.createRegistration);

// Admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/', registrationController.getRegistrations);
router.get('/tournament/:tournamentId', registrationController.getTournamentRegistrations);
router.post('/:id/cancel', registrationController.cancelRegistration);

module.exports = router;