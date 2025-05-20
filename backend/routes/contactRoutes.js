const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Import the controller function
const { sendMessage } = require('../controllers/contactController');

console.log('sendMessage:', sendMessage); // Optional: for debugging

// @route   POST /contact/send
// @desc    Handle contact form submissions
// @access  Public
router.post(
  '/send',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('message').notEmpty().withMessage('Message cannot be empty')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  sendMessage
);

module.exports = router;
