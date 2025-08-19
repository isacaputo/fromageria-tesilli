'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {}
  }
  Auth.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Auth',
    }
  );
  return Auth;
};
