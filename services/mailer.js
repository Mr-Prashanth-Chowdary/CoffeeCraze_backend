const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000, 
  debug: true
});

// Function to send email
const sendEmail = async (to, subject, html) => {
  console.log('Sending email to:', to);
  console.log('Using email:', process.env.EMAIL_USER);

  const mailOptions = {
    from: "CoffeeCraze",
    to,
    subject,
    html:html,
    // html: '<p>Your HTML content here</p>', // Optional: Add HTML content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;
  } catch (err) {
    console.error('Error sending email:', err.message, err.stack);
    throw err;
  }
};

module.exports = { sendEmail };