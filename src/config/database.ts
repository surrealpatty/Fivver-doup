import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// Extend the NodeJS.ProcessEnv interface to include custom properties
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
      DB_PORT?: string;
      NODE_ENV?: string;
      JWT_SECRET: string;
      JWT_EXPIRATION?: string;
      PROD_DB_USER?: string;
      PROD_DB_PASSWORD?: string;
      PROD_DB_NAME?: string;
      PROD_DB_HOST?: string;
      TEST_DB_USER?: string;
      TEST_DB_PASSWORD?: string;
      TEST_DB_NAME?: string;
    }
  }
}

// Sequelize Database Configuration for different environments
const sequelizeConfig = {
  development: {
    username: process.env.DB_USER || 'root',                               // Use DB_USER from env, fallback to 'root'
    password: process.env.DB_PASSWORD || '',                               // Use DB_PASSWORD from env, fallback to empty string
    database: process.env.DB_NAME || 'fivver_doup',                       // Use DB_NAME from env, fallback to 'fivver_doup'
    host: process.env.DB_HOST || '127.0.0.1',                             // Use DB_HOST from env, fallback to '127.0.0.1'
    dialect: 'mysql',  // Directly use the string value instead of 'Dialect'
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: process.env.NODE_ENV === 'development',                      // Enable logging in development
  },
  production: {
    username: process.env.PROD_DB_USER || 'root',                         // Use PROD_DB_USER from env, fallback to 'root'
    password: process.env.PROD_DB_PASSWORD || '',                         // Use PROD_DB_PASSWORD from env, fallback to empty string
    database: process.env.PROD_DB_NAME || 'fivver_doup',                 // Use PROD_DB_NAME from env, fallback to 'fivver_doup'
    host: process.env.PROD_DB_HOST || '127.0.0.1',                       // Use PROD_DB_HOST from env, fallback to '127.0.0.1'
    dialect: 'mysql',  // Directly use the string value instead of 'Dialect'
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: true,  // SSL should be enabled in production
    },
    logging: false,  // Disable logging in production
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',                        // Use TEST_DB_USER from env, fallback to 'root'
    password: process.env.TEST_DB_PASSWORD || '',                        // Use TEST_DB_PASSWORD from env, fallback to empty string
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',            // Use TEST_DB_NAME from env, fallback to 'fivver_doup_test'
    host: process.env.DB_HOST || '127.0.0.1',                            // Use DB_HOST from env, fallback to '127.0.0.1'
    dialect: 'mysql',  // Directly use the string value instead of 'Dialect'
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: false,  // Disable logging in test environment
  },
};

// Select the configuration based on the current environment
const environment = process.env.NODE_ENV || 'development';  // Default to 'development' if NODE_ENV is not set
const currentConfig = sequelizeConfig[environment as 'development' | 'production' | 'test'];

// Ensure DB_PORT is a valid integer
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;  // Default to 3306 if DB_PORT is not set
if (isNaN(dbPort)) {
  throw new Error(`Invalid DB_PORT: ${process.env.DB_PORT}. Falling back to default 3306.`);
}

// Initialize Sequelize with the selected configuration
const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect as 'mysql',  // Cast the dialect here
    dialectOptions: currentConfig.dialectOptions,
    logging: currentConfig.logging,
    port: dbPort,
  }
);

// Function to test the database connection
const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    return false;
  }
};

export { sequelize, testConnection };
