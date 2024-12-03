'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Method to add the 'tier' column
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'tier', {
      type: Sequelize.STRING, // Data type for the column
      allowNull: false,      // Column cannot be null
      defaultValue: 'free',  // Default value for the column
    });
  },

  // Method to remove the 'tier' column
  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'tier');
  },
};
