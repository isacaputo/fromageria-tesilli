var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET orders list */
router.get("/", async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM orders;`);
    console.log(result);
    res.send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* GET order by id */
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await db(`SELECT * FROM orders WHERE id = ${id};`);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* INSERT into orders table */
router.post("/", async function (req, res, next) {
  const { totalAmount, clientName, clientEmail, clientPhone, clientAddress } =
    req.body;
  try {
    const items = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 2,
      },
    ];

    const productIds = items.map((value) => value.productId);

    const { data } = await db(
      `SELECT id, product_whole_price FROM products WHERE id IN (${productIds.join(
        ","
      )});`
    );
    let amount = 0;
    items.forEach((item) => {
      const selected = data.find((p) => p.id === item.productId);
      if (selected) {
        amount += selected.product_whole_price * item.quantity;
      }
    });

    console.log(amount);

    // await db(
    //   `INSERT INTO orders (total_amount, client_name, client_email, client_phone, client_address) VALUES (${totalAmount}, '${clientName}', '${clientEmail}', '${clientPhone}', '${clientAddress}');`
    // );
    res.status(201).send("sucesso!");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
