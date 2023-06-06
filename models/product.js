'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
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
    product_extra_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};