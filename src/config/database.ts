import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the database configurations for different environments
type DBConfig = {
  development: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: Dialect;
    logging: boolean;
    dialectOptions: {
      charset: string;
    };
  };
  test: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: Dialect;
    logging: boolean;  // Added logging property for the test environment
    dialectOptions: {
      charset: string;
    };
  };
  production: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: Dialect;
    logging: boolean;  // Added logging property for the production environment
    dialectOptions: {
      charset: string;
      ssl: boolean | { rejectUnauthorized: boolean };
    };
  };
};

// Get the environment from the process (defaults to 'development' if not set)
const environment = process.env.NODE_ENV as keyof DBConfig || 'development';

// Load the configuration for the current environment
const config: DBConfig = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as Dialect,
    logging: true, // Set to true for development
    dialectOptions: {
      charset: 'utf8mb4', // Ensure correct charset
    },
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as Dialect,
    logging: false, // Set to false for testing (or keep true for debugging)
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as Dialect,
    logging: false, // Set to false for production (or enable if needed)
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: {
        rejectUnauthorized: true, // Ensure production has proper SSL config
      },
    },
  },
};

// Ensure that the correct configuration is loaded based on the environment
const dbConfig = config[environment];

// Create a new Sequelize instance with the loaded configuration
const sequelize = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  logging: dbConfig.logging, // Now logging is defined for all environments
});

export { sequelize };
