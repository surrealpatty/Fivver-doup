import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file (if present)
dotenv.config();

// Create a new Sequelize instance to connect to your database
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'fivver_doup', // Database name (default: 'fivver_doup')
  process.env.DB_USER || 'root',        // Username (default: 'root')
  process.env.DB_PASSWORD || 'password', // Password (default: 'password')
  {
    host: process.env.DB_HOST || 'localhost',  // Database host (default: 'localhost')
    dialect: 'mysql', // Change this if you're using a different database (e.g., 'postgres', 'sqlite')
    logging: false,   // Set to `true` to log SQL queries, `false` to disable logging
  }
);

// Function to test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
