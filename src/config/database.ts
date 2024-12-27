import * as dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

// Define the allowed environment keys
type Environment = 'development' | 'test' | 'production';

// Load environment variables based on the current NODE_ENV
const env = (process.env.NODE_ENV || 'development') as Environment;
dotenv.config({ path: `./src/.env.${env}` });  // Load .env.test, .env.development, or .env.production

// Log the current environment for debugging
console.log(`Running in ${env} environment`);

// Define the required environment variables for each environment
const envVars = {
  development: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'],
  test: ['TEST_DB_USER', 'TEST_DB_PASSWORD', 'TEST_DB_NAME', 'TEST_DB_HOST', 'TEST_DB_PORT'],
  production: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'],
};

// Check if required environment variables are defined for the current environment
const requiredEnvVars = envVars[env];

// Ensure all required environment variables are present
requiredEnvVars.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
});

// Log the loaded environment variables for debugging (can be removed later)
console.log('Loaded environment variables:', {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

// Database configuration object for different environments
const config: Record<Environment, { 
  username: string; 
  password: string; 
  database: string; 
  host: string; 
  port: number; 
  dialect: Dialect; 
  logging?: boolean; 
}> = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false,  // Disable logging in the test environment
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
  },
};

// Create and export the Sequelize instance
const sequelize = new Sequelize({
  username: config[env].username,
  password: config[env].password,
  database: config[env].database,
  host: config[env].host,
  port: config[env].port,
  dialect: config[env].dialect,
  logging: config[env].logging,
});

// Log the Sequelize configuration for debugging (can be removed later)
console.log('Sequelize configuration:', {
  username: config[env].username,
  database: config[env].database,
  host: config[env].host,
  port: config[env].port,
  dialect: config[env].dialect,
});

export default sequelize;
