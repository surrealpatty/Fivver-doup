'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the 'services' table with a nullable 'user_id' column
    await queryInterface.createTable('services', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Make sure the column is nullable to support 'SET NULL'
        references: {
          model: 'users', // Refers to the 'users' table
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create foreign key constraint on 'user_id' column
    await queryInterface.addConstraint('services', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'services_ibfk_1', // Custom name for the foreign key
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the foreign key constraint and the 'services' table
    await queryInterface.removeConstraint('services', 'services_ibfk_1');
    await queryInterface.dropTable('services');
  }
};
