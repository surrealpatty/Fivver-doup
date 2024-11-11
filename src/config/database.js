const { Sequelize } = require('sequelize');

// Load environment variables from a .env file
require('dotenv').config();

// List of required environment variables for validation
const requiredKeys = ['DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST'];

// Function to validate the presence of required environment variables
const validateEnvVars = () => {
  for (const key of requiredKeys) {
    if (!process.env[key]) {
      console.error(`Missing environment variable: ${key}`);
      process.exit(1); // Exit the process if any required environment variable is missing
    }
  }
};

// Validate environment variables
validateEnvVars();

// Define the configuration object with settings for 'development' and 'production' environments
const config = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || 'prod_user',
    password: process.env.DB_PASSWORD || 'prod_password',
    database: process.env.DB_NAME || 'prod_database',
    host: process.env.DB_HOST || 'prod_host',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
};

// Get the environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';

// Set up Sequelize instance with the environment-specific configuration
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    dialectOptions: config[env].dialectOptions,
    logging: config[env].logging,
  }
);

module.exports = { sequelize, config };
