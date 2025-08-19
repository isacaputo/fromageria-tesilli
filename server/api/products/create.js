const { initDatabase, checkDatabaseConnection } = require('../utils/database');

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
    checkDatabaseConnection();
    const { models } = initDatabase();

    if (req.method === 'POST') {
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

      res.status(201).json(product);
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
