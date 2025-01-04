import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user'; // Ensure the path is correct
import Service from '../models/services'; // Ensure the path is correct
import Order from '../models/order'; // Ensure the Order model exists and is correctly defined
import { Review } from '../models/review'; // Ensure the Review model exists and is correctly defined

dotenv.config(); // Load environment variables from .env file

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Database username
  password: process.env.DB_PASSWORD || 'password', // Database password
  database: process.env.DB_NAME || 'fivver_doup', // Database name
  host: process.env.DB_HOST || '127.0.0.1', // Database host
  dialect: 'mysql', // MySQL dialect
  models: [User, Service, Order, Review], // Ensure models are correctly defined and imported
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log queries in development
  define: {
    freezeTableName: true, // Prevent pluralized table names
    timestamps: true, // Add createdAt and updatedAt fields
  },
  pool: {
    max: 10, // Maximum number of connections
    min: 0, // Minimum number of connections
    acquire: 30000, // Maximum time (ms) to acquire a connection
    idle: 10000, // Maximum idle time (ms) before a connection is released
  },
  dialectOptions: {
    charset: 'utf8mb4', // Use UTF-8 with full Unicode support
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false }
      : undefined, // Use SSL if specified in environment variables
  },
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('An unknown error occurred during the connection test');
    }
    // Removed process.exit(1) to allow Jest to handle the error gracefully
  }
};

// Call the test connection function
testConnection();

// Export sequelize for use in other parts of the application
export { sequelize };
