/* eslint no-console: 0 */

const nodemailer = require("../lib/nodemailer");

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error("Failed to create a testing account");
    console.error(err);
    return process.exit(1);
  }

  console.log("Credentials obtained, sending message...");

  // NB! Store the account object values somewhere if you want
  // to re-use the same account for future mail deliveries
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "isadora.caputo@gmail.com",
      pass: "ofoa kvtz drdo bldu",
    },
  });

  // Message object
  let message = {
    from: "Fromageria Tesilli <isadora.caputo@gmail.com>",
    to: "Isadora Caputo <isadora.caputo@gmail.com>",

    // Subject of the message
    subject: "Recebemos o seu pedido!" + Date.now(),

    // plaintext body
    text: "Hello to myself!",

    // HTML body
    html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
        <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,

    // AMP4EMAIL
    amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }

    console.log("Message sent successfully!");
    console.log(nodemailer.getTestMessageUrl(info));

    // only needed when using pooled connections
    transporter.close();
  });
});
