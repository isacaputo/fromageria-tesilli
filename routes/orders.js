var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const { transporter } = require('../nodemailer/message_transporter');
const models = require('../models');
const { Op } = require('sequelize');
var userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');

router.get('/', userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const result = await models.Order.findAll({
      include: models.Product,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/', async function (req, res, next) {
  const { clientName, clientEmail, clientPhone, clientAddress, items } =
    req.body;

  try {
    const productIds = items.map((value) => value.id);

    const productResponse = await models.Product.findAll({
      attributes: ['id', 'product_whole_price', 'product_half_price'],
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
    });

    const productResponseData = productResponse.map(
      (product) => product.dataValues
    );

    let amount = 0;
    items.forEach((item) => {
      const selected = productResponseData.find((p) => p.id === item.id);
      console.log(selected);
      if (selected) {
        if (item.size % 1 === 0) {
          amount += selected.product_whole_price * item.quantity;
        } else {
          amount += selected.product_half_price * item.quantity;
        }
      }
    });

    await models.Order.create({
      total_amount: amount,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      client_address: clientAddress,
    });

    const ordersResponse = await models.Order.findOne({
      attributes: ['id'],
      order: [['date', 'DESC']],
    });

    const orderId = ordersResponse.dataValues.id;

    const insertItemsQuery = items.map((item) =>
      models.OrderHasProduct.create({
        order_id: orderId,
        product_id: item.id,
        size: item.size,
        quantity: item.quantity,
      })
    );

    await Promise.all(insertItemsQuery);

    let message = {
      from: 'Fromageria Tesilli <isadora.caputo@gmail.com>',
      to: `${clientName} <${clientEmail}>`,
      subject: 'Fromageria Tesilli: Recebemos o seu pedido!',
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
