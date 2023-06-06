'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Products', 'product_slogan', {
      type: Sequelize.TEXT,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Products', 'product_slogan', {
      type: Sequelize.STRING(255), // Revert back to the original column length
    });
  }
};
