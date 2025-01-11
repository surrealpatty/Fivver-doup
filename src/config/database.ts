import { Sequelize } from 'sequelize-typescript'; // Use 'sequelize-typescript' for model loading
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/user'; // Import your models
import Service from '../models/services'; // Import other models as needed

// Load environment variables from the .env file
dotenv.config();

// Extract the current environment and set defaults
const environment = process.env.NODE_ENV || 'development';

// Map environment variables for database configuration
const DB_USERNAME =
  environment === 'test' ? process.env.TEST_DB_USERNAME || 'test_user' : process.env.DB_USERNAME || 'root';
const DB_PASSWORD =
  environment === 'test' ? process.env.TEST_DB_PASSWORD || 'test_password' : process.env.DB_PASSWORD || 'password';
const DB_NAME =
  environment === 'test' ? process.env.TEST_DB_NAME || 'fivver_doup_test' : process.env.DB_NAME || 'fivver_doup';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USE_SSL = process.env.DB_USE_SSL === 'true';

// Configure Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql', // Set dialect to MySQL
  host: DB_HOST, // Database host
  username: DB_USERNAME, // Database username
  password: DB_PASSWORD, // Database password
  database: DB_NAME, // Database name
  port: DB_PORT, // Database port
  models: [User, Service], // Include your models here
  logging: environment === 'development' ? console.log : false, // Enable logging only in development
  define: {
    freezeTableName: true, // Prevent table name pluralization
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (ms) to acquire a connection
    idle: 10000, // Maximum time (ms) a connection can remain idle
  },
  dialectOptions: {
    charset: 'utf8mb4', // Support extended characters
    collate: 'utf8mb4_unicode_ci',
    ssl: DB_USE_SSL
      ? { require: true, rejectUnauthorized: false } // Enable SSL if required
      : undefined,
  },
});

// Export the Sequelize instance for use across the application
export { sequelize };
