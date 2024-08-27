// backend/emailController.js
const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
  try {
    const { fullName, lastName, email, sendTo, subject, description } = req.body;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: 'amitpal08057@gmail.com',
      to: sendTo,
      subject: subject,
      text: `Full Name: ${fullName}\nLast Name: ${lastName}\nDescription: ${description}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    // Send error response
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
};
