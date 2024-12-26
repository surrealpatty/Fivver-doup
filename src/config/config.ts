import { config } from 'dotenv';

// Load environment variables from .env
config();

// Named exports for configuration values
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Database configuration
export const development = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',  // Ensure you have the correct password in your .env file
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
};

// You can also add configurations for test and production environments if needed
export const test = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'f0^:8t1#qaC7',
  database: process.env.DB_NAME || 'fivver_doup_test',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
};

export const production = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fivver_doup_prod',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
};
