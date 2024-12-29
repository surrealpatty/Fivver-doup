// src/config/database.ts

import { Sequelize } from 'sequelize';
import config from './config'; // Import the config file that exports environments

// Get the environment (defaults to 'development' if not set)
const environment = process.env.NODE_ENV || 'development';

// Get the database configuration for the current environment
const dbConfig = config[environment];

// Create a new Sequelize instance with the current environment's configuration
const sequelize = new Sequelize(
  dbConfig.database, // Database name
  dbConfig.username,  // Username
  dbConfig.password,  // Password
  {
    host: dbConfig.host,         // Host
    dialect: dbConfig.dialect,   // Dialect (mysql in this case)
    logging: dbConfig.logging,   // Enable logging based on the environment
    dialectOptions: dbConfig.dialectOptions, // Charset and other dialect-specific options
    ssl: dbConfig.dialectOptions.ssl, // SSL configuration for production
  }
);

export { sequelize }; // Export the sequelize instance
