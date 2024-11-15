'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if 'role' column exists before adding it
    const hasRoleColumn = await queryInterface.describeTable('users');
    if (!hasRoleColumn['role']) {
      await queryInterface.addColumn('users', 'role', {
        type: Sequelize.ENUM('Free', 'Paid'),
        allowNull: false,
        defaultValue: 'Free',
      });
    }

    // Check if 'subscription_status' column exists before adding it
    const hasSubscriptionStatusColumn = await queryInterface.describeTable('users');
    if (!hasSubscriptionStatusColumn['subscription_status']) {
      await queryInterface.addColumn('users', 'subscription_status', {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Inactive',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.removeColumn('users', 'subscription_status');
  }
};
