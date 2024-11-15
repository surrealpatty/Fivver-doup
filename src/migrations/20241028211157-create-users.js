'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get table description
    const tableDesc = await queryInterface.describeTable('users');

    // Add 'first_name' column if it doesn't exist
    if (!tableDesc.first_name) {
      await queryInterface.addColumn('users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Ensure 'subscription_start_date' column is removed (it doesn't exist in the model or should be removed if present)
    if (tableDesc.subscription_start_date) {
      await queryInterface.removeColumn('users', 'subscription_start_date');
    }

    // Ensure 'created_at' column exists and set default value
    if (!tableDesc.created_at) {
      await queryInterface.addColumn('users', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    // Ensure 'updated_at' column exists with automatic update on modification
    if (!tableDesc.updated_at) {
      await queryInterface.addColumn('users', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      });
    }

    // Modify columns and ensure constraints (username, email should be unique)
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

    // If 'subscription_end_date' column is missing, we add it
    if (!tableDesc.subscription_end_date) {
      await queryInterface.addColumn('users', 'subscription_end_date', {
        type: Sequelize.DATE,
        allowNull: true, // Allow null values
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove 'first_name' column
    await queryInterface.removeColumn('users', 'first_name');

    // Ensure 'subscription_start_date' column is removed (if it exists)
    await queryInterface.removeColumn('users', 'subscription_start_date');

    // Remove 'created_at' column
    await queryInterface.removeColumn('users', 'created_at');

    // Remove 'updated_at' column
    await queryInterface.removeColumn('users', 'updated_at');

    // Remove 'subscription_end_date' column
    await queryInterface.removeColumn('users', 'subscription_end_date');
  }
};
