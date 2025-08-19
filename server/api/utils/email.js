const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'isadora.caputo@gmail.com',
    pass: process.env.EMAIL_PASS || 'ofoakvtzdrdobldu',
  },
});

module.exports = { transporter };
