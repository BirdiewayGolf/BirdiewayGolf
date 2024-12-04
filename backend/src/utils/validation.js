// backend/src/utils/validation.js
const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
  body('playerName').trim().notEmpty().withMessage('Player name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('handicap').optional().isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateTournament = [
  body('name').trim().notEmpty().withMessage('Tournament name is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('league').isIn(['business', 'amateur', 'junior']).withMessage('Valid league is required'),
  body('location').notEmpty().withMessage('Location is required'),
  // Add more validation as needed
];