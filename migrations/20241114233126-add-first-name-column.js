'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the 'first_name' column exists before adding it
    const hasColumn = await queryInterface.describeTable('users');
    if (!hasColumn['first_name']) {
      await queryInterface.addColumn('users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Check if the 'last_name' column exists before adding it
    if (!hasColumn['last_name']) {
      await queryInterface.addColumn('users', 'last_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'first_name');
    await queryInterface.removeColumn('users', 'last_name');
  }
};
