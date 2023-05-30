var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const nodemailer = require("nodemailer");

/* GET from orders table */
router.get("/", async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM orders;`);
    res.send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* INSERT into orders table */
router.post("/", async function (req, res, next) {
  const { clientName, clientEmail, clientPhone, clientAddress, items } =
    req.body;

  try {
    const productIds = items.map((value) => value.id);

    const productResponse = await db(
      `SELECT id, product_whole_price, product_half_price FROM products WHERE id IN (${productIds.join(
        ","
      )});`
    );
    let amount = 0;
    items.forEach((item) => {
      const selected = productResponse.data.find((p) => p.id === item.id);
      if (selected) {
        if (item.size % 1 === 0) {
          amount += selected.product_whole_price * item.quantity;
        } else {
          amount += selected.product_half_price * item.quantity;
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
        `INSERT INTO order_has_product (order_id, product_id, size, quantity) VALUES (${orderId}, ${item.id}, ${item.size}, ${item.quantity});`
    );

    await db(insertItemsQuery.join(""));
    res.status(200).send({ orderId: orderId });
  } catch (err) {
    res.status(400).send(err);
  }

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

  transporter.sendMail(message, (error) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }

    console.log("Message sent successfully!");

    // only needed when using pooled connections
    transporter.close();
  });
});

module.exports = router;
