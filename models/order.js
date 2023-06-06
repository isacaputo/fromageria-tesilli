'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    date: DataTypes.DATE,
    total_amount: DataTypes.FLOAT,
    client_name: DataTypes.STRING,
    client_email: DataTypes.STRING,
    client_phone: DataTypes.STRING,
    client_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};