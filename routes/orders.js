var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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

    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
