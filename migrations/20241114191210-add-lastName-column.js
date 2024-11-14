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

    // If the 'created_at' column exists, remove it
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

    // Optionally drop other columns or revert any changes as needed
  }
};