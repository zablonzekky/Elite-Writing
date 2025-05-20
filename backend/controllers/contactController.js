const Message = require('../models/messageModel');

// @desc    Handle contact form submission
// @route   POST /contact/send
// @access  Public
exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Message Save Error:', err.message || err);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
