import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a new Sequelize instance with the values from environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if DB_NAME is not set
  process.env.DB_USER || 'root', // Default to 'root' if DB_USER is not set
  process.env.DB_PASSWORD || '', // Default to empty string if DB_PASSWORD is not set
  {
    host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if DB_HOST is not set
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT || '3306', 10), // Default to port 3306 if DB_PORT is not set
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
