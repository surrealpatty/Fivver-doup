import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user';
import Service from '../models/services';
import Order from '../models/order';
import { Review } from '../models/review';

dotenv.config(); // Load environment variables from .env file

// Fetch database credentials from environment variables or fallback to defaults
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'fivver_doup';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_USE_SSL = process.env.DB_USE_SSL || 'false';

const sequelize = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: 'mysql',
  models: [User, Service, Order, Review], // Define all your models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    freezeTableName: true,  // Prevent Sequelize from pluralizing table names
    timestamps: true,  // Ensure timestamp fields (createdAt, updatedAt) are automatically handled
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000, // Max time, in ms, before throwing an error
    idle: 10000, // Max time, in ms, before an idle connection is released
  },
  dialectOptions: {
    charset: 'utf8mb4',  // Ensures support for extended characters, such as emojis
    collate: 'utf8mb4_unicode_ci',
    ssl: DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false } // Enables SSL if DB_USE_SSL is true
      : undefined,  // Disables SSL if DB_USE_SSL is false
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
  }
};

// Call the test connection function
testConnection();

// Export the Sequelize instance for use in other parts of the application
export { sequelize };
