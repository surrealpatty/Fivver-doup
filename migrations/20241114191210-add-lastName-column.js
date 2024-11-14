'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the 'users' table with additional profile fields
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      // New columns
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ratings: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      reviews_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      service_offerings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
    });

    // Add lastName column only if it does not exist
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");
    const columnExists = columns.some(col => col.Field === 'lastName');

    if (!columnExists) {
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop the 'users' table if it exists
    await queryInterface.dropTable('users');
  }
};
