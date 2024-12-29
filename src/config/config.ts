import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// JWT Secret and Expiration configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Database configuration for different environments
const config = {
  development: {
    username: process.env.DB_USER || 'root', // Default to 'root' if not set
    password: process.env.DB_PASSWORD || '', // Default to empty string if not set
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if DB_HOST is not set
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development', // Enable logging in development only
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  test: {
    username: process.env.TEST_DB_USER || 'root', // Default to 'root' for testing
    password: process.env.TEST_DB_PASSWORD || '', // Default to empty string for testing
    database: process.env.TEST_DB_NAME || 'fivver_doup_test', // Default to 'fivver_doup_test' for testing
    host: process.env.TEST_DB_HOST || '127.0.0.1', // Default to localhost if TEST_DB_HOST is not set
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'test', // Enable logging only for test environment
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  production: {
    username: process.env.DB_USER || 'root', // Default to 'root' if not set
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if DB_HOST is not set
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false } // Enable SSL only in production
          : undefined,
    },
  },
};

export default config;
