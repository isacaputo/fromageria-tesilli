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
    const { models } = await ensureConnection(true);

    if (req.method === 'GET') {
      // Get orders without associations first
      const orders = await models.Order.findAll();

      // Manually fetch related data to avoid association issues
      const ordersWithProducts = [];

      for (const order of orders) {
        const orderProducts = await models.OrderHasProduct.findAll({
          where: { order_id: order.id },
        });

        const productsData = [];
        for (const orderProduct of orderProducts) {
          const product = await models.Product.findByPk(
            orderProduct.product_id
          );
          if (product) {
            productsData.push({
              ...product.dataValues,
              OrderHasProduct: {
                size: orderProduct.size,
                quantity: orderProduct.quantity,
              },
            });
          }
        }

        ordersWithProducts.push({
          ...order.dataValues,
          Products: productsData,
        });
      }

      res.status(200).json(ordersWithProducts);
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
