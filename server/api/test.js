const { ensureConnection } = require('./utils/database');

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
    console.log('Health check started...');

    // Test database connection
    const { models } = await ensureConnection();

    // Test basic query with timeout
    const queryPromise = models.Product.count();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), 10000)
    );

    const productCount = await Promise.race([queryPromise, timeoutPromise]);

    const duration = Date.now() - startTime;

    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      productCount,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      vercel: !!process.env.VERCEL,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('Health check failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  }
};
