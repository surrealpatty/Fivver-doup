const { Sequelize, DataTypes } = require('sequelize');

// Mock Sequelize instance using an in-memory SQLite database
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false, // Disable logging for cleaner test output
});

// Mock some methods of Sequelize that might be used during tests
sequelize.authenticate = jest.fn().mockResolvedValue(true); // Mock sequelize.authenticate

// You can add more mocks for other methods if needed for your tests
// For example:
// sequelize.sync = jest.fn().mockResolvedValue(true);

module.exports = { sequelize, DataTypes };
