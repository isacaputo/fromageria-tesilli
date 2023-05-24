var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET PRODUCTS LIST */
router.get("/", async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM products;`);
    console.log(result);
    res.send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
