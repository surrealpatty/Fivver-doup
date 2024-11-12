import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize with MySQL configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',  // Use environment variable for host, default to localhost
  database: process.env.DB_NAME || 'fivver_doup',  // Use environment variable for DB name
  username: process.env.DB_USER || 'test_user',  // Use environment variable for username
  password: process.env.DB_PASSWORD || 'your_test_password',  // Use environment variable for password
  logging: false,  // Turn off logging for cleaner output, set to true for debugging
  charset: 'utf8mb4',  // Ensure utf8mb4 encoding is used
  collate: 'utf8mb4_general_ci',  // Use utf8mb4 collation for full Unicode support
});

// Test the database connection
const testConnection = async (): Promise<void> => {
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
