import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from the correct .env file based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? 'src/.env.test' : 'src/.env',
});

// Ensure environment variables are set or throw an error if undefined
const dbName = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const dbUser = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DB_USER;
const dbPassword = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const dbHost = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PORT : process.env.DB_PORT || 3306;

// Throw an error if any required environment variables are missing
if (!dbName || !dbUser || !dbPassword) {
  throw new Error('Missing database configuration in environment variables.');
}

// JWT Configuration (Add JWT_SECRET and JWT_EXPIRATION here)
export const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Database configuration for different environments
const config = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql' as Dialect,
    logging: process.env.NODE_ENV === 'development', // Enable logging in development only
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  test: {
    username: dbUser,
    password: dbPassword,
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: dbHost,
    port: dbPort,
    dialect: 'mysql' as Dialect,
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  production: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql' as Dialect,
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: { rejectUnauthorized: false },
    },
  },
};

export default config;
