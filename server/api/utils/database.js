const { Sequelize, DataTypes } = require('sequelize');

// Singleton pattern for database connection
let sequelize;
let models = {};
let isInitialized = false;

// Force reset function for debugging
const resetConnection = () => {
  if (sequelize) {
    sequelize.close();
  }
  sequelize = null;
  models = {};
  isInitialized = false;
  console.log('Database connection reset');
};

const initDatabase = async (forceReset = false) => {
  if (forceReset) {
    resetConnection();
  }

  if (!sequelize || !isInitialized) {
    console.log('Initializing database connection...');

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectModule: require('mysql2'),
      logging: false, // Disable logging in production to reduce overhead
      pool: {
        max: 1, // Use single connection for serverless
        min: 0,
        acquire: 20000, // Shorter timeout for faster failure
        idle: 1000, // Very short idle time
        evict: 1000, // Evict connections quickly
      },
      dialectOptions: {
        connectTimeout: 20000,
        acquireTimeout: 20000,
        timeout: 20000,
        // Add SSL config if needed
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
      },
      retry: {
        match: [
          /ETIMEDOUT/,
          /EHOSTUNREACH/,
          /ECONNRESET/,
          /ECONNREFUSED/,
          /ENOTFOUND/,
          /EAI_AGAIN/,
        ],
        max: 2, // Reduce retries for faster failure
      },
    });

    // Test the connection with timeout
    try {
      console.log('Testing database authentication...');
      await Promise.race([
        sequelize.authenticate(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Database authentication timeout')),
            15000
          )
        ),
      ]);
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      resetConnection(); // Clean up on failure
      throw new Error(`Database connection failed: ${error.message}`);
    }

    // Define Product model
    models.Product = sequelize.define(
      'Product',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_name: DataTypes.STRING,
        product_description: DataTypes.STRING,
        product_half_price: DataTypes.FLOAT,
        product_whole_price: DataTypes.FLOAT,
        product_half_weight: DataTypes.FLOAT,
        product_whole_weight: DataTypes.FLOAT,
        product_pairing: DataTypes.STRING,
        product_slogan: DataTypes.TEXT,
        product_category: DataTypes.STRING,
        product_main_image: DataTypes.STRING,
        product_extra_image: DataTypes.STRING,
      },
      { tableName: 'Products', timestamps: true }
    );

    // Define Order model
    models.Order = sequelize.define(
      'Order',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        date: DataTypes.DATE,
        total_amount: DataTypes.FLOAT,
        client_name: DataTypes.STRING,
        client_email: DataTypes.STRING,
        client_phone: DataTypes.STRING,
        client_address: DataTypes.STRING,
      },
      { tableName: 'Orders', timestamps: true }
    );

    // Define Auth model
    models.Auth = sequelize.define(
      'Auth',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      { tableName: 'Auths', timestamps: true }
    );

    // Define OrderHasProduct model
    models.OrderHasProduct = sequelize.define(
      'OrderHasProduct',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        order_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        size: DataTypes.FLOAT,
        quantity: DataTypes.FLOAT,
      },
      { tableName: 'OrderHasProducts', timestamps: true }
    );

    models.OrderHasProduct.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'Order',
    });

    models.OrderHasProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'Product',
    });

    models.Order.hasMany(models.OrderHasProduct, {
      foreignKey: 'order_id',
      as: 'OrderProducts',
    });

    models.Product.hasMany(models.OrderHasProduct, {
      foreignKey: 'product_id',
      as: 'ProductOrders',
    });

    isInitialized = true;
    console.log('Database models initialized');
  }

  return { sequelize, models };
};

const checkDatabaseConnection = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // If sequelize exists, test the connection
  if (sequelize) {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error('Database connection test failed:', error);
      // Reset the connection if it's dead
      sequelize = null;
      models = {};
      throw new Error(`Database connection lost: ${error.message}`);
    }
  }
};

const ensureConnection = async (forceReset = false) => {
  const startTime = Date.now();

  try {
    console.log('Ensuring database connection...');

    // Don't force reset on every request in serverless - let connections persist between requests
    if (forceReset) {
      resetConnection();
    }

    await checkDatabaseConnection();
    const { models } = await initDatabase(forceReset);

    const duration = Date.now() - startTime;
    console.log(`Database connection established in ${duration}ms`);

    return { models };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Database connection failed after ${duration}ms:`, error);
    console.error('DATABASE_URL exists:', !!process.env.DATABASE_URL);

    // Clean up on failure
    resetConnection();
    throw error;
  }
};
module.exports = {
  initDatabase,
  checkDatabaseConnection,
  ensureConnection,
  resetConnection,
};
