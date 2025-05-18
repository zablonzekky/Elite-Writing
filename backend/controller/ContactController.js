const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = await Message.create({ name, email, message });

    res.status(201).json({
      message: 'Message sent successfully!',
      data: newMessage
    });
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
