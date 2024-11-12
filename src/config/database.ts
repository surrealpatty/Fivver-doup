import { Sequelize } from 'sequelize';

// Initialize Sequelize with MySQL configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  database: 'fivver_doup',
  username: 'test_user',
  password: 'your_test_password',
  logging: false,  // Turn off logging for cleaner output, set to true for debugging
});

// Test the database connection
const testConnection = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
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

// Test the connection on script run
testConnection();

export { sequelize, testConnection };
