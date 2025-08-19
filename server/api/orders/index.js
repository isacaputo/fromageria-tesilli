const nodemailer = require('nodemailer');
const { transporter } = require('../utils/email');
const { ensureConnection } = require('../utils/database');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { models } = await ensureConnection();

    if (req.method === 'GET') {
      // Note: You'll need to implement authentication middleware for Vercel
      const result = await models.Order.findAll({
        include: {
          model: models.Product,
          through: {
            attributes: ['size', 'quantity'], // Only include existing columns
          },
        },
      });
      res.status(200).json(result);
    } else if (req.method === 'POST') {
      const { clientName, clientEmail, clientPhone, clientAddress, items } =
        req.body;

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
        order: [['createdAt', 'DESC']],
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

      res.status(200).json({ orderId: orderId });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
