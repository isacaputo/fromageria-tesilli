var express = require('express');
var router = express.Router();
const db = require('../server/model/helper');
var userShouldBeLoggedIn = require('../server/guards/userShouldBeLoggedIn');
const models = require('../server/models');

router.get('/', async function (req, res) {
  try {
    const products = await models.Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const product = await models.Product.findOne({
      where: {
        id,
      },
    });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete('/:id', userShouldBeLoggedIn, async function (req, res, next) {
  const { id } = req.params;
  try {
    const product = await models.Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    await product.destroy();

    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', userShouldBeLoggedIn, async function (req, res) {
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
    product_extra_image,
  } = req.body;

  try {
    const product = await models.Product.create({
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
      product_extra_image,
    });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
