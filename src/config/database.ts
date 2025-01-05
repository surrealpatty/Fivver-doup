import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user';
import Service from '../models/services';
import Order from '../models/order';
import { Review } from '../models/review';

dotenv.config(); // Load environment variables from .env file

// Determine environment and use appropriate database config
const isTestEnv = process.env.NODE_ENV === 'test';

// Fetch database credentials from environment variables or fallback to defaults
const DB_USERNAME = isTestEnv ? process.env.TEST_DB_USERNAME : process.env.DB_USERNAME;
const DB_PASSWORD = isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const DB_NAME = isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const DB_HOST = isTestEnv ? process.env.TEST_DB_HOST : process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306; // Provide fallback if DB_PORT is undefined
const DB_USE_SSL = process.env.DB_USE_SSL === 'true'; // Convert DB_USE_SSL to boolean

// Initialize Sequelize
const sequelize = new Sequelize({
  username: DB_USERNAME as string, // Ensure DB_USERNAME is treated as a string
  password: DB_PASSWORD as string, // Ensure DB_PASSWORD is treated as a string
  database: DB_NAME as string, // Ensure DB_NAME is treated as a string
  host: DB_HOST as string, // Ensure DB_HOST is treated as a string
  port: DB_PORT,  // Use parsed DB_PORT value
  dialect: 'mysql',
  models: [User, Service, Order, Review], // Define all your models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false,  // Only log in development
  define: {
    freezeTableName: true,  // Prevent Sequelize from pluralizing table names
    timestamps: true,  // Ensure timestamp fields (createdAt, updatedAt) are automatically handled
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,  // Max time, in ms, before throwing an error
    idle: 10000,  // Max time, in ms, before an idle connection is released
  },
  dialectOptions: {
    charset: 'utf8mb4',  // Ensures support for extended characters (emojis, etc.)
    collate: 'utf8mb4_unicode_ci',
    ssl: DB_USE_SSL ? { require: true, rejectUnauthorized: false } : undefined,  // Enable SSL if configured
  },
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    if (error instanceof Error) {  // Narrow down the error type to `Error`
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('An unknown error occurred during the connection test');
    }
  }
};

// Call the test connection function
testConnection();

// Export the Sequelize instance for use in other parts of the application
export { sequelize };
