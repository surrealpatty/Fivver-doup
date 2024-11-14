'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add 'lastName' column only if it does not exist
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");
    const columnExists = columns.some(col => col.Field === 'lastName');

    if (!columnExists) {
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // If the 'created_at' column is incorrectly referenced, remove it safely
    const columnCreatedAtExists = columns.some(col => col.Field === 'created_at');
    if (columnCreatedAtExists) {
      await queryInterface.removeColumn('users', 'created_at');
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop the 'lastName' column if it exists
    await queryInterface.removeColumn('users', 'lastName');
  }
};
