const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const {
  signup,
  login,
} = require('../controllers/authController');

const User = require('../models/User');

// Signup Route
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
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

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password is required'),
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

// Get Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Validate Email and Send Activation Code
router.post('/validate-email', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Generate a 6-character activation code
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Hash the code to prevent tampering
  const hashedCode = await bcrypt.hash(code, 12);

  try {
    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zablonzekky21@gmail.com', // ⚠️ Use environment variables for production
        pass: '6wekesa6' // ⚠️ Use an app password + store in .env
      }
    });

    // Send the activation code
    await transporter.sendMail({
      from: '"Elite Writing Services" <zablonzekky21@gmail.com>',
      to: email,
      subject: 'Your Activation Code',
      text: `Hello ${name || ''}, your activation code is: ${code}`,
      html: `<p>Hello ${name || ''},</p><p>Your activation code is: <strong>${code}</strong></p>`
    });

    res.status(200).json({
      message: 'Activation code sent to email',
      code, // ⚠️ Only include this for development; remove in production
      hashedCode // ⚠️ You should save this in the DB instead
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send activation code' });
  }
});

module.exports = router;
