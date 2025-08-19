'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderHasProduct,
        foreignKey: 'product_id',
      });
    }
  }
  Product.init(
    {
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
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
