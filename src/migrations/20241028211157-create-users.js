'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get table description to check existing columns
    const tableDesc = await queryInterface.describeTable('users');

    // Add 'firstName' column if it doesn't exist
    if (!tableDesc.firstName) {
      await queryInterface.addColumn('users', 'firstName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Ensure 'subscription_start_date' column is removed (it shouldn't be in the model)
    if (tableDesc.subscription_start_date) {
      await queryInterface.removeColumn('users', 'subscription_start_date');
    }

    // Ensure 'createdAt' and 'updatedAt' columns exist with the correct default values
    if (!tableDesc.createdAt) {
      await queryInterface.addColumn('users', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    if (!tableDesc.updatedAt) {
      await queryInterface.addColumn('users', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      });
    }

    // Modify columns and ensure constraints
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Ensure 'username' is unique
    });

    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Ensure 'email' is unique
    });

    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false, // Password should not be null
    });

    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('Free', 'Paid'),
      allowNull: false,
      defaultValue: 'Free', // Default value 'Free'
    });

    await queryInterface.changeColumn('users', 'subscription_status', {
      type: Sequelize.ENUM('Inactive', 'Active'),
      allowNull: false,
      defaultValue: 'Inactive', // Default value 'Inactive'
    });

    // If 'subscriptionEndDate' column is missing, we add it
    if (!tableDesc.subscriptionEndDate) {
      await queryInterface.addColumn('users', 'subscriptionEndDate', {
        type: Sequelize.DATE,
        allowNull: true, // Allow null values
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove columns added in the migration
    await queryInterface.removeColumn('users', 'firstName');
    await queryInterface.removeColumn('users', 'createdAt');
    await queryInterface.removeColumn('users', 'updatedAt');
    await queryInterface.removeColumn('users', 'subscriptionEndDate');
    
    // If 'subscription_start_date' exists, remove it
    await queryInterface.removeColumn('users', 'subscription_start_date');
  }
};
