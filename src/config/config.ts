// config/config.ts

import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = 'X^SE4Jzp$qfd1Fs2qfT*',
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306', // Default MySQL port
  NODE_ENV = 'development', // Default to 'development' if not set
  JWT_SECRET = 'your-secret-key', // Default JWT secret
  JWT_EXPIRATION = '1h', // Default expiration time for JWT
} = process.env;

// Ensure DB_PORT is a valid number
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Define the interface for configuration
export interface Config {
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}

// Configuration object for different environments
const config: { [key: string]: Config } = {
  development: {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT: parsedDBPort,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION,
  },
  test: {
    DB_HOST: process.env.TEST_DB_HOST || 'localhost',
    DB_USER: process.env.TEST_DB_USER || 'test_user',
    DB_PASSWORD: process.env.TEST_DB_PASSWORD || 'test_password',
    DB_NAME: process.env.TEST_DB_NAME || 'fivver_doup_test',
    DB_PORT: parsedDBPort,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION,
  },
  production: {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT: parsedDBPort,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION,
  },
};

// Export the appropriate configuration based on NODE_ENV
export default config[NODE_ENV];
