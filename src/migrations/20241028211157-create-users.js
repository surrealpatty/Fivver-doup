'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the foreign key constraint exists
    const tableDesc = await queryInterface.describeTable('services');
    const foreignKeyExists = tableDesc.user_id && tableDesc.user_id.references;

    // If the foreign key exists, drop it first
    if (foreignKeyExists) {
      await queryInterface.removeConstraint('services', 'services_ibfk_1');
    }

    // Add the foreign key column (if it doesn't already exist)
    if (!tableDesc.user_id) {
      await queryInterface.addColumn('services', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true, // Allowing NULL values as users can potentially be deleted, leaving services orphaned
        references: {
          model: 'users', // Reference the 'users' table
          key: 'id',      // The foreign key column in the 'users' table
        },
        onDelete: 'SET NULL',  // On delete, set the user_id to NULL
        onUpdate: 'CASCADE',   // On update, cascade the update to 'services'
      });
    } else {
      // If the column exists but the constraint does not, add the constraint
      await queryInterface.addConstraint('services', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'services_ibfk_1',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the foreign key constraint and the user_id column
    await queryInterface.removeConstraint('services', 'services_ibfk_1');
    await queryInterface.removeColumn('services', 'user_id');
  }
};
