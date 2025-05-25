const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const {
  signup,
  login,
} = require('../controllers/authController');

const User = require('../models/user');

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
        user: 'zablonzekky21@gmail.com', // ← replace with your real Gmail
        pass: 'pljy olrs jslg sgwc' // ← use an app password
      }
    });

    const mailOptions = {
      from: 'zablonzekky21@gmail.com',
      to: email,
      subject: 'Your Activation Code',
      html: `<p>Hi ${name || 'there'},</p>
             <p>Your activation code is: <strong>${code}</strong></p>`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Activation code sent', code: hashedCode });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Export the router
module.exports = router;
