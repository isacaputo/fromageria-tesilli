var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const nodemailer = require("../node_modules/nodemailer");

/* INSERT into orders table */
router.post("/", async function (req, res, next) {
  const { clientName, clientEmail, clientPhone, clientAddress, items } =
    req.body;
  try {
    const productIds = items.map((value) => value.productId);

    const productResponse = await db(
      `SELECT id, product_whole_price, product_half_price FROM products WHERE id IN (${productIds.join(
        ","
      )});`
    );
    let amount = 0;
    items.forEach((item) => {
      const selected = productResponse.data.find(
        (p) => p.id === item.productId
      );
      if (selected) {
        if (item.quantity % 1 === 0) {
          amount += selected.product_whole_price * item.quantity;
        } else {
          const intQuantity = Math.floor(item.quantity);
          amount += selected.product_whole_price * intQuantity;
          amount += selected.product_half_price;
        }
      }
    });

    await db(
      `INSERT INTO orders 
      (total_amount, client_name, client_email, client_phone, client_address) VALUES 
      (${amount}, '${clientName}', '${clientEmail}', '${clientPhone}', '${clientAddress}');`
    );

    const ordersResponse = await db(
      "SELECT id FROM orders ORDER BY date DESC LIMIT 1;"
    );

    const orderId = ordersResponse.data[0].id;

    /* INSERT into order_has_product table */
    const insertItemsQuery = items.map(
      (item) =>
        `INSERT INTO order_has_product (order_id, product_id, quantity) VALUES (${orderId}, ${item.productId}, ${item.quantity});`
    );

    await db(insertItemsQuery.join(""));

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

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport(
        {
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
          logger: true,
          transactionLog: true, // include SMTP traffic in the logs
          allowInternalNetworkInterfaces: false,
        },
        {
          // default message fields

          // sender info
          from: "Fromageria Tesilli <rosanna.mrsilveira@gmail.com>",
          headers: {
            "X-Laziness-level": 1000, // just an example header, no need to use this
          },
        }
      );

      // Message object
      let message = {
        // Comma separated list of recipients
        to: "Isadora Caputo <isadora.caputo@gmail.com>",

        // Subject of the message
        subject: "Nodemailer is unicode friendly ✔" + Date.now(),

        // plaintext body
        text: "Hello to myself!",

        // HTML body
        html: `<p><b>Hello</b> to myself</p>
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

    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
