var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const nodemailer = require("nodemailer");
const { transporter } = require("../nodemailer/message_transporter");

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

    let message = {
      from: "Fromageria Tesilli <isadora.caputo@gmail.com>",
      to: `${clientName} <${clientEmail}>`,
      subject: "Fromageria Tesilli: Recebemos o seu pedido!",
      html: `<h2><b>Olá ${clientName}!</b></h2>
      <p>Estamos muito felizes em receber o seu pedido. Para que possa acompanhar o seu andamento, o número é: <b>${orderId}</b></p>
      <p>Em breve, entraremos em contato para detalhamento do frete e entrega.</p>
      <p>Até mais!</p>`,
    };

    const info = await transporter.sendMail(message);

    res.status(200).send({ orderId: orderId });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
