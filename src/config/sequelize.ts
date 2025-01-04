import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user'; // Adjust this if the model path is different
import Service from '../models/services'; // Adjust this if the model path is different
import Order from '../models/order'; // Ensure the path is correct
import { Review } from '../models/review'; // Ensure the path is correct

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize instance with environment variables or defaults
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Use environment variable or default 'root'
  password: process.env.DB_PASSWORD || 'password', // Replace with your actual password
  database: process.env.DB_NAME || 'fivver_doup', // Ensure it matches your database name
  host: process.env.DB_HOST || '127.0.0.1', // Default to localhost
  dialect: 'mysql', // MySQL dialect
  models: [User, Service, Order, Review], // Register models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log queries in development
  define: {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  },
  pool: {
    max: 10, // Max number of connections
    min: 0,  // Min number of connections
    acquire: 30000, // Max time (ms) to acquire a connection
    idle: 10000,   // Time (ms) a connection can remain idle before being released
  },
  dialectOptions: {
    charset: 'utf8mb4', // For handling multi-byte characters (e.g., emojis)
    collate: 'utf8mb4_unicode_ci', // Ensure proper collation for UTF-8 characters
    ssl: process.env.DB_USE_SSL === 'true' 
      ? { require: true, rejectUnauthorized: false } // Enable SSL if required
      : undefined,
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
    process.exit(1); // Exit process if connection fails
  }
};

// Call the test connection function
testConnection();

// Export sequelize for use in other parts of the application
export { sequelize };
