const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Import controllers
const {
  signup,
  login
} = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signup
);

// @route   POST /api/auth/login
// @desc    Authenticate user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;