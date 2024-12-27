// src/config/database.ts
import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Set environment (default to 'development')
const env = process.env.NODE_ENV || 'development';

// Load environment variables
dotenv.config({ path: `./.env.${env}` });

// Ensure required environment variables exist for the current environment
const requiredEnvVars =
  {
    development: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'],
    test: [
      'TEST_DB_USER',
      'TEST_DB_PASSWORD',
      'TEST_DB_NAME',
      'TEST_DB_HOST',
      'TEST_DB_PORT',
    ],
    production: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'],
  }[env] || [];

requiredEnvVars.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
});

// Define Sequelize configuration based on the environment
const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql', // Use a valid string literal for the dialect
    logging: true, // Set a default value for logging
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
    dialect: 'mysql', // Use a valid string literal for the dialect
    logging: false,
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql', // Use a valid string literal for the dialect
    logging: true, // Set a default value for logging
  },
};

// Initialize Sequelize instance
const sequelize = new Sequelize({
  username: config[env as keyof typeof config].username,
  password: config[env as keyof typeof config].password,
  database: config[env as keyof typeof config].database,
  host: config[env as keyof typeof config].host,
  port: config[env as keyof typeof config].port,
  dialect: config[env as keyof typeof config].dialect as Dialect,
  logging: config[env as keyof typeof config].logging ?? true,
});

// Export the sequelize instance as the default export
export default sequelize;
