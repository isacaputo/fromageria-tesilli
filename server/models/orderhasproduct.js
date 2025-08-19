'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderHasProduct extends Model {
    static associate(models) {}
  }
  OrderHasProduct.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      size: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'OrderHasProduct',
    }
  );
  return OrderHasProduct;
};
