// src/config/database.js

const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize('fivver_doup', 'test_user', 'your_test_password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();  // Test the database connection
    console.log('Database connection has been established successfully.');
  } catch (error) {
    // Type guard to handle unknown error type in TypeScript
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database:', error);
    }
    process.exit(1);  // Exit the process if the connection fails
  }
};

module.exports = {
  sequelize,
  testConnection
};
