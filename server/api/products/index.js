const { ensureConnection } = require('../utils/database');

module.exports = async (req, res) => {
  const startTime = Date.now();

  // Set CORS headers
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
    console.log('Products API called, establishing connection...');

    // Add timeout wrapper for the entire operation
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Request timeout after 25 seconds')),
        25000
      )
    );

    const operationPromise = (async () => {
      const { models } = await ensureConnection();

      if (req.method === 'GET') {
        const { id } = req.query;

        if (id) {
          // Get specific product by ID
          console.log('Getting product with ID:', id);
          const product = await models.Product.findOne({
            where: { id },
          });

          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }

          res.status(200).json(product);
        } else {
          // Get all products
          console.log('Fetching all products...');
          const products = await models.Product.findAll();
          console.log(`Found ${products ? products.length : 0} products`);

          // Ensure we always return an array
          const productsArray = Array.isArray(products) ? products : [];
          res.status(200).json(productsArray);
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    })();

    await Promise.race([operationPromise, timeoutPromise]);

    const duration = Date.now() - startTime;
    console.log(`Products API completed in ${duration}ms`);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Products API failed after ${duration}ms:`, error);
    console.error('Error stack:', error.stack);

    if (!res.headersSent) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        duration: `${duration}ms`,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }
};
