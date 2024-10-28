'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password1', // Use a hashed password in real applications
        created_at: new Date(),
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'hashed_password2', // Use a hashed password in real applications
        created_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // This will remove the seed data by deleting all entries from the users table
    await queryInterface.bulkDelete('users', null, {});
  }
};
