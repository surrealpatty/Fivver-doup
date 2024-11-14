'use strict';

/** @type {import('sequelize-cli').Migration} */
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
      // Remove manual timestamps if Sequelize handles them
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // Set default value to current date
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // Set default value to current date
      },
      // New columns
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true, // Optional field for the user's profile picture URL
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true, // Optional field for the user's bio
      },
      ratings: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.0, // Default value for ratings
      },
      reviews_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0, // Default value for reviews count
      },
      service_offerings: {
        type: Sequelize.JSON, // Use Sequelize.JSON for MySQL
        allowNull: true, // Optional field for service offerings (as a JSON object)
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the 'users' table if it exists
    await queryInterface.dropTable('users');
  }
};
