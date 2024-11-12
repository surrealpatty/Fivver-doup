import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from a .env file (recommended for sensitive data)
dotenv.config();

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost', // Use env variable for DB host
  username: process.env.DB_USERNAME || 'root', // Use env variable for DB username
  password: process.env.DB_PASSWORD || '', // Use env variable for DB password
  database: process.env.DB_NAME || 'fivver_doup', // Use env variable for DB name
  dialectOptions: {
    charset: 'utf8mb4', // Avoid cesu8 encoding issue with utf8mb4
  },
  logging: false, // Set to true to enable logging for debugging purposes
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export { sequelize, testConnection };
