// src/config/database.ts

import { Sequelize } from 'sequelize';

// Initialize Sequelize with MySQL configuration
const sequelize = new Sequelize('fivver_doup', 'test_user', 'your_test_password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();  // Test the database connection
    console.log('Database connection has been established successfully.');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database:', error);
    }
    process.exit(1);  // Exit the process if the connection fails
  }
};

export { sequelize, testConnection };
