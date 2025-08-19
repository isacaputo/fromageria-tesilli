const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "isadora.caputo@gmail.com",
    pass: "ofoakvtzdrdobldu",
  },
});
module.exports = { transporter };
