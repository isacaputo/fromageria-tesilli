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

// Post a new product

module.exports = router;
router.post("/", async function (req, res, next ) {
  const { 
    product_name,
    product_description,
    product_half_price,
    product_whole_price, 
    product_half_weight,
    product_whole_weight,
    product_pairing, 
    product_slogan, 
    product_category, 
    product_main_image, 
    product_extra_image
  } = req.body;
  try {
    await db(`INSERT INTO products (product_name,
      product_description,
      product_half_price,
      product_whole_price, 
      product_half_weight,
      product_whole_weight,
      product_pairing, 
      product_slogan, 
      product_category, 
      product_main_image, 
      product_extra_image)
      VALUES (
      '${product_name}',
      '${product_description}',
      '${product_half_price}',
      '${product_whole_price}',
      '${product_half_weight}',
      '${product_whole_weight}',
      '${product_pairing}',
      '${product_slogan}',
      '${product_category}',
      '${product_main_image}',
      '${product_extra_image}'
      )`);
      res.send({ message: "product has been added to the database"})
  } catch(err) {
    res.status(500).send({ message: err })
  }
})
