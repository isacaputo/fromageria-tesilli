'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: models.OrderHasProduct,
        foreignKey: 'order_id',
      });
    }
  }
  Order.init(
    {
      date: DataTypes.DATE,
      total_amount: DataTypes.FLOAT,
      client_name: DataTypes.STRING,
      client_email: DataTypes.STRING,
      client_phone: DataTypes.STRING,
      client_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
