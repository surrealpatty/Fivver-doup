// __mocks__/database.js
const { Sequelize } = require('sequelize');

// Create a mock Sequelize instance that uses an in-memory SQLite database
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false, // Disable logging for tests
  dialectOptions: {
    // Set any necessary dialect options here (optional)
  },
});

// Mock the `authenticate` and `sync` methods to simulate database connection behavior
sequelize.authenticate = jest.fn().mockResolvedValue(true);
sequelize.sync = jest.fn().mockResolvedValue(true);

// Mock models if needed
const User = {
  findByPk: jest.fn(),
  create: jest.fn(),
  // Other methods for User model can be added here as needed
};

// Export sequelize and mock models
module.exports = { sequelize, User };
