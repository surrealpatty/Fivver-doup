import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Set environment (default to 'development')
const env = process.env.NODE_ENV || 'development';

// Load the correct environment variables file based on the current environment
dotenv.config({ path: `./.env.${env}` }); // This will load .env.development, .env.test, or .env.production based on the environment

// Ensure the required environment variables are defined for the current environment
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

// Define Sequelize configuration for different environments
const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql', // Use 'mysql' for MySQL databases
    logging: true, // Set a default value for logging
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
    dialect: 'mysql', // Use 'mysql' for MySQL databases
    logging: false, // Disable logging for tests
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql', // Use 'mysql' for MySQL databases
    logging: true, // Enable logging in production
  },
};

// Initialize Sequelize instance for the current environment with type assertion
const sequelize = new Sequelize({
  username: config[env as keyof typeof config].username,
  password: config[env as keyof typeof config].password,
  database: config[env as keyof typeof config].database,
  host: config[env as keyof typeof config].host,
  port: config[env as keyof typeof config].port,
  dialect: config[env as keyof typeof config].dialect as Dialect, // Ensure 'dialect' is treated as a valid Dialect type
  logging: config[env as keyof typeof config].logging ?? true, // Default to 'true' if logging is undefined
});

// Export Sequelize instance as default
export default sequelize;
