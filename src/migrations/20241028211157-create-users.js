'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: true, // Optional field for first name
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'first_name');
  }
};
