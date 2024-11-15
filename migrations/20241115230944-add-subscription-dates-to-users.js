'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if 'subscription_start_date' column exists before adding it
    const hasSubscriptionStartDateColumn = await queryInterface.describeTable('users');
    if (!hasSubscriptionStartDateColumn['subscription_start_date']) {
      await queryInterface.addColumn('users', 'subscription_start_date', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    // Check if 'subscription_end_date' column exists before adding it
    const hasSubscriptionEndDateColumn = await queryInterface.describeTable('users');
    if (!hasSubscriptionEndDateColumn['subscription_end_date']) {
      await queryInterface.addColumn('users', 'subscription_end_date', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the columns in case of rollback
    await queryInterface.removeColumn('users', 'subscription_start_date');
    await queryInterface.removeColumn('users', 'subscription_end_date');
  }
};
