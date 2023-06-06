'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderHasProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderHasProduct.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    size: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderHasProduct',
  });
  return OrderHasProduct;
};