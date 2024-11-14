'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if 'first_name' column exists, if not, add it
    const tableDesc = await queryInterface.describeTable('users');
    if (!tableDesc.first_name) {
      await queryInterface.addColumn('users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Check if 'subscription_start_date' column exists, if not, add it
    if (!tableDesc.subscription_start_date) {
      await queryInterface.addColumn('users', 'subscription_start_date', {
        type: Sequelize.DATE,
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

    // Ensure that 'username', 'email', 'password' columns have unique constraints
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('Free', 'Paid'),
      allowNull: false,
      defaultValue: 'Free',
    });
    await queryInterface.changeColumn('users', 'subscription_status', {
      type: Sequelize.ENUM('Inactive', 'Active'),
      allowNull: false,
      defaultValue: 'Inactive',
    });
    await queryInterface.changeColumn('users', 'subscription_end_date', {
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove 'first_name' column
    await queryInterface.removeColumn('users', 'first_name');

    // Remove 'subscription_start_date' column
    await queryInterface.removeColumn('users', 'subscription_start_date');

    // Remove 'created_at' column
    await queryInterface.removeColumn('users', 'created_at');

    // Remove 'updated_at' column
    await queryInterface.removeColumn('users', 'updated_at');
  }
};
