import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user'; // Ensure the path is correct
import Service from '../models/services'; // Ensure the path is correct
import Order from '../models/order'; // Ensure the Order model exists and is correctly defined
import { Review } from '../models/review'; // Ensure the Review model exists and is correctly defined

dotenv.config(); // Load environment variables from .env

// Initialize Sequelize instance with environment variables or defaults
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Replace 'root' if a different user is used
  password: process.env.DB_PASSWORD || 'password', // Replace 'password' with your actual password
  database: process.env.DB_NAME || 'fivver_doup', // Match your database name
  host: process.env.DB_HOST || '127.0.0.1', // Default to localhost
  dialect: 'mysql', // Use MySQL dialect
  models: [User, Service, Order, Review], // Register your models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log queries only in development
  define: {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  },
  pool: {
    max: 10, // Maximum number of connections
    min: 0,  // Minimum number of connections
    acquire: 30000, // Maximum time (ms) to acquire a connection
    idle: 10000,   // Time (ms) a connection can remain idle before release
  },
  dialectOptions: {
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false } // Enable SSL if required
      : undefined,
    charset: 'utf8mb4', // Use utf8mb4 for storing multi-byte characters like emojis
    collate: 'utf8mb4_unicode_ci', // Use utf8mb4_unicode_ci for proper character collation
  },
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error: unknown) {
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
