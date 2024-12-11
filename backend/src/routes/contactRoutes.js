const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes - no authentication needed
router.post('/', contactController.submitContact);  // Changed from '/contact' to '/'

// Admin routes - protected by authentication
router.get('/', authMiddleware, adminMiddleware, contactController.getContacts);
router.patch('/:id/status', authMiddleware, adminMiddleware, contactController.updateContactStatus);
router.delete('/:id', authMiddleware, adminMiddleware, contactController.deleteContact);

module.exports = router;