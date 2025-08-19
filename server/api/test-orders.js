const { ensureConnection } = require('./utils/database');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
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

    // Test basic queries
    const orderCount = await models.Order.count();
    const productCount = await models.Product.count();
    const orderProductCount = await models.OrderHasProduct.count();

    // Test a simple order query without associations
    const simpleOrders = await models.Order.findAll({
      limit: 3,
      attributes: ['id', 'client_name', 'total_amount'],
    });

    // Test the association query
    let ordersWithProducts = null;
    try {
      ordersWithProducts = await models.Order.findAll({
        limit: 1,
        include: {
          model: models.Product,
          through: {
            attributes: ['size', 'quantity'],
          },
        },
      });
    } catch (assocError) {
      ordersWithProducts = { error: assocError.message };
    }

    res.status(200).json({
      message: 'Orders test successful',
      counts: {
        orders: orderCount,
        products: productCount,
        orderProducts: orderProductCount,
      },
      simpleOrders,
      ordersWithProducts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Orders test error:', error);
    res.status(500).json({
      message: 'Orders test failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
