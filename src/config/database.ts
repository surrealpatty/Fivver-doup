// src/config/database.ts

import 'reflect-metadata';  // Ensure reflect-metadata is imported at the top
import { Sequelize } from 'sequelize-typescript'; // Import Sequelize
import { User } from '../models/user'; // Correct import path for User model
import { Service } from '../models/services'; // Correct import path for Service model
import { Order } from '../models/order'; // Correct import path for Order model
import { Review } from '../models/review'; // Correct import path for Review model
import * as dotenv from 'dotenv'; // Load environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize instance with necessary configurations
const sequelize = new Sequelize({
  dialect: 'mysql', // Database dialect
  host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if not set
  username: process.env.DB_USER || 'root', // Default to 'root' if not set
  password: process.env.DB_PASSWORD || '', // Default to an empty string if not set
  database: process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if not set
  models: [User, Service, Order, Review], // Register all models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging in development mode
  define: {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (ms) to wait for a connection
    idle: 10000, // Maximum time (ms) a connection can remain idle
  },
  dialectOptions: {
    // SSL configuration, enable if needed
    ssl: process.env.DB_USE_SSL === 'true' ? { 
      require: true, 
      rejectUnauthorized: false 
    } : undefined,
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Sync database schema in non-production environments
if (process.env.NODE_ENV !== 'production') {
  sequelize
    .sync({ alter: true }) // Adjust tables to match models (use cautiously)
    .then(() => {
      console.log('Database synchronized successfully.');
    })
    .catch((error) => {
      console.error('Error synchronizing the database:', error);
    });
}

// Export the Sequelize instance
export { sequelize };
