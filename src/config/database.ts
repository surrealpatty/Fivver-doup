import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user';
import Service from '../models/services';
import Order from '../models/order';
import { Review } from '../models/review';

dotenv.config(); // Load environment variables from .env file

// After fixing the last object or function declaration

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Ensure no missing commas
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  models: [User, Service, Order, Review],
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false }
      : undefined,
}});  // Ensure the closing brace and parentheses are correct here


// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    if (error instanceof Error) { // Type guard to ensure 'error' is of type Error
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('An unknown error occurred during the connection test');
    }
    process.exit(1); // Exit the process if connection fails
  }
};

// Call the test connection function
testConnection();

// Export the Sequelize instance
export { sequelize };
