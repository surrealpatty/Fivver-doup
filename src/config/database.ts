const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define the configuration type for the database
type DatabaseConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  dialectOptions: {
    charset: string;
    ssl: boolean;
  };
  logging: boolean;
};

// Define the database configuration object with environment-specific settings
const config: { [key: string]: DatabaseConfig } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4', // Ensure the correct charset is being used
      ssl: false,
    },
    logging: process.env.NODE_ENV === 'development', // Enable logging in development
  },
  production: {
    username: process.env.PROD_DB_USER || 'root',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'fivver_doup',
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4', // Ensure the correct charset is being used
      ssl: true, // Enable SSL in production
    },
    logging: false,
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4', // Ensure the correct charset is being used
      ssl: false,
    },
    logging: false,
  },
};

// Define the environment type
const environment = process.env.NODE_ENV || 'development'; // Could be 'development', 'production', or 'test'

// Ensure environment is one of the expected values
if (!['development', 'production', 'test'].includes(environment)) {
  throw new Error(`Invalid environment: ${environment}`);
}

// Use the appropriate config based on the environment
const currentConfig = config[environment as 'development' | 'production' | 'test'];  // Type assertion to narrow down the environment type

// Create and export the Sequelize instance with the selected configuration
const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    dialectOptions: currentConfig.dialectOptions,
    logging: currentConfig.logging,
    port: process.env.DB_PORT || 3306, // Use DB_PORT from environment if available
  }
);

// Function to test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

module.exports = { sequelize, testConnection };
