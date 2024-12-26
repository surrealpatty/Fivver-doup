import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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

// Determine the current environment
const environment = process.env.NODE_ENV || 'development';

// Ensure the environment is valid
if (!['development', 'production', 'test'].includes(environment)) {
  throw new Error(`Invalid environment: ${environment}`);
}

// Select the configuration based on the environment
const currentConfig = config[environment as 'development' | 'production' | 'test'];

// Parse the database port or fall back to 3306
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

// Create a Sequelize instance with the selected configuration
const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    dialectOptions: currentConfig.dialectOptions,
    logging: currentConfig.logging,
    port: dbPort, // Use the parsed port here
  }
);

// Function to test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
  }
};

// Export sequelize and testConnection as named exports
export { sequelize, testConnection };
