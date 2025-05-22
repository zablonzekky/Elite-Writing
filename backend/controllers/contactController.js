const nodemailer = require('nodemailer');
const Message = require('../models/messageModel');

// Setup Nodemailer transporter once
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Prepare email notification content
    const mailOptions = {
      from: `"Elite Writing Services" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,  // <-- your client's notification email
      subject: `New Contact Message: ${subject}`,
      text: `
You have a new message from the contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `,
      html: `
        <p>You have a new message from the contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Message Save or Email Error:', err.message || err);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
