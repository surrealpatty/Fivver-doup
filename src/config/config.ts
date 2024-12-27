// src/config/config.ts

import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// JWT Secret and Expiration configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Database configuration for different environments
export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if DB_HOST is not set
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development', // Enable logging in development only
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME || 'fivver_doup_test', // Fallback to 'fivver_doup_test' if TEST_DB_NAME is not set
    host: process.env.TEST_DB_HOST || '127.0.0.1', // Default to localhost if TEST_DB_HOST is not set
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if DB_HOST is not set
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : undefined, // Enable SSL only in production
    },
  },
};
