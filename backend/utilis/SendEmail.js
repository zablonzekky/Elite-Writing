const nodemailer = require('nodemailer');

const sendEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Auth System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Verification Code",
    html: `<h1>Your code is: ${code}</h1>`,
  });
};

module.exports = sendEmail;
