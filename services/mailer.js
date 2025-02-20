const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, 
  },
  debug: true, // enable debugging
});

// Function to send email
const sendPaymentSuccessEmail = async (to, subject, text) => {
  console.log('Sending email to:', to);
  console.log('Using email:', process.env.EMAIL_USER);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
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

module.exports = { sendPaymentSuccessEmail };