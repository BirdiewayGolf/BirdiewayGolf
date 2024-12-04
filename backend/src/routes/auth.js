const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { validate } = require('../middleware/validate');

// Define the route with the controller function
router.post('/login', login);

module.exports = router;