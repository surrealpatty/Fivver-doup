'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if 'users' table exists and if 'lastName' column exists before adding
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");

    // Check if 'lastName' column already exists
    const columnExists = columns.some(col => col.Field === 'lastName');
    if (!columnExists) {
      // Add 'lastName' column if it doesn't exist
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Check if 'created_at' column exists, and remove it if it does
    const columnCreatedAtExists = columns.some(col => col.Field === 'created_at');
    if (columnCreatedAtExists) {
      await queryInterface.removeColumn('users', 'created_at');
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if 'lastName' column exists before attempting to remove it
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");
    const columnExists = columns.some(col => col.Field === 'lastName');
    if (columnExists) {
      // Drop the 'lastName' column if it exists
      await queryInterface.removeColumn('users', 'lastName');
    }
    
    // Revert other changes if needed (e.g., re-add 'created_at' if required)
    const columnCreatedAtExists = columns.some(col => col.Field === 'created_at');
    if (!columnCreatedAtExists) {
      // Add back the 'created_at' column if it was removed earlier
      await queryInterface.addColumn('users', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
  }
};
