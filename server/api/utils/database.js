const { Sequelize, DataTypes } = require('sequelize');

// Singleton pattern for database connection
let sequelize;
let models = {};

const initDatabase = async () => {
  if (!sequelize) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectModule: require('mysql2'),
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
      dialectOptions: {
        connectTimeout: 60000,
        acquireTimeout: 60000,
        timeout: 60000,
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
        max: 3,
      },
    });

    // Test the connection
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
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

    // Define associations
    models.Product.belongsToMany(models.Order, {
      through: models.OrderHasProduct,
      foreignKey: 'product_id',
    });

    models.Order.belongsToMany(models.Product, {
      through: models.OrderHasProduct,
      foreignKey: 'order_id',
    });
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

const ensureConnection = async () => {
  try {
    await checkDatabaseConnection();
    const { models } = await initDatabase();
    return { models };
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

module.exports = {
  initDatabase,
  checkDatabaseConnection,
  ensureConnection,
};
