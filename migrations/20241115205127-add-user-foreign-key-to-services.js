'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the column doesn't exist before adding it
    const hasColumn = await queryInterface.describeTable('users');
    if (!hasColumn['subscription_start_date']) {
      await queryInterface.addColumn('users', 'subscription_start_date', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    // Similarly for subscription_end_date
    if (!hasColumn['subscription_end_date']) {
      await queryInterface.addColumn('users', 'subscription_end_date', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'subscription_start_date');
    await queryInterface.removeColumn('users', 'subscription_end_date');
  }
};
