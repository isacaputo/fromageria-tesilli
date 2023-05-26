var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET products list */
router.get("/", async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM products;`);
    res.send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* GET products by id */
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await db(`SELECT * FROM products WHERE id = ${id};`);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
