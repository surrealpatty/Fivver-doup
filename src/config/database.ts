const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Set environment (default to 'development')
const env = process.env.NODE_ENV || 'development';

// Load environment variables
dotenv.config({ path: `./.env.${env}` });  // Load appropriate .env file based on environment

// Log the current environment for debugging
console.log(`Running in ${env} environment`);

// Ensure required environment variables exist for the current environment
const requiredEnvVars = {
  development: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'],
  test: ['TEST_DB_USER', 'TEST_DB_PASSWORD', 'TEST_DB_NAME', 'TEST_DB_HOST', 'TEST_DB_PORT'],
  production: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'],
}[env] || [];

requiredEnvVars.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
});

// Log the loaded environment variables for debugging (remove later)
console.log('Loaded environment variables:', {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

// Define Sequelize configuration based on the environment
const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: true,  // Set a default value for logging
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: true,  // Set a default value for logging
  },
};

// Initialize Sequelize instance with type assertion
const sequelize = new Sequelize({
  username: config[env as keyof typeof config].username,
  password: config[env as keyof typeof config].password,
  database: config[env as keyof typeof config].database,
  host: config[env as keyof typeof config].host,
  port: config[env as keyof typeof config].port,
  dialect: config[env as keyof typeof config].dialect,
  logging: config[env as keyof typeof config].logging ?? true, // Default to true if logging is undefined
});

// Log the Sequelize configuration for debugging
console.log('Sequelize configuration:', {
  username: config[env as keyof typeof config].username,
  database: config[env as keyof typeof config].database,
  host: config[env as keyof typeof config].host,
  port: config[env as keyof typeof config].port,
  dialect: config[env as keyof typeof config].dialect,
  logging: config[env as keyof typeof config].logging,
});

// Export Sequelize instance
module.exports = sequelize;
