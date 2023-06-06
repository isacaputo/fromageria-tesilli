'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      product_description: {
        type: Sequelize.STRING
      },
      product_half_price: {
        type: Sequelize.FLOAT
      },
      product_whole_price: {
        type: Sequelize.FLOAT
      },
      product_half_weight: {
        type: Sequelize.FLOAT
      },
      product_whole_weight: {
        type: Sequelize.FLOAT
      },
      product_pairing: {
        type: Sequelize.STRING
      },
      product_slogan: {
        type: Sequelize.TEXT
      },
      product_category: {
        type: Sequelize.STRING
      },
      product_main_image: {
        type: Sequelize.STRING
      },
      product_extra_image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};