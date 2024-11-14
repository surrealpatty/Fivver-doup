'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the column 'first_name' already exists
    const tableDesc = await queryInterface.describeTable('users');
    if (!tableDesc.first_name) {
      await queryInterface.addColumn('users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Check if 'created_at' column exists, if not, add it with default CURRENT_TIMESTAMP
    if (!tableDesc.created_at) {
      await queryInterface.addColumn('users', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    // Check if 'updated_at' column exists, if not, add it with default CURRENT_TIMESTAMP on update
    if (!tableDesc.updated_at) {
      await queryInterface.addColumn('users', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove 'first_name' column
    await queryInterface.removeColumn('users', 'first_name');

    // Remove 'created_at' column
    await queryInterface.removeColumn('users', 'created_at');

    // Remove 'updated_at' column
    await queryInterface.removeColumn('users', 'updated_at');
  }
};
