const { ensureConnection, resetConnection } = require('./utils/database');

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
    console.log('Forcing database connection reset...');

    // Force reset the connection
    resetConnection();

    // Reinitialize with force reset
    const { models } = await ensureConnection(true);

    // Test the OrderHasProduct model structure
    const attributes = Object.keys(models.OrderHasProduct.rawAttributes);

    // Test a simple orders query
    const orderCount = await models.Order.count();

    // Test the problematic association query
    let associationTest = null;
    try {
      associationTest = await models.Order.findAll({
        limit: 1,
        include: {
          model: models.Product,
          through: {
            attributes: ['size', 'quantity'],
          },
        },
      });
      associationTest = 'SUCCESS';
    } catch (assocError) {
      associationTest = { error: assocError.message };
    }

    res.status(200).json({
      message: 'Database reset and reinitialized successfully',
      orderHasProductAttributes: attributes,
      orderCount,
      associationTest,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Reset test error:', error);
    res.status(500).json({
      message: 'Reset test failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
