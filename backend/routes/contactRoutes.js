const express = require('express');
const router = express.Router();

// Controller
const { sendMessage } = require('../controllers/contactController');
console.log('sendMessage:', sendMessage);

// @route   POST /api/contact
// @desc    Handle contact form submission
// @access  Public
router.post('/', sendMessage);

module.exports = router;
