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
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'; // Use string literals for dialects
  dialectOptions: {
    charset: string;
    ssl: boolean;
  };
  logging: boolean;
};

// Define the database configuration object with environment-specific settings
const config: { [key: string]: DatabaseConfig } = {
  development: {
    username: process.env.DB_USER || 'root', // Default to 'root' if not set
    password: process.env.DB_PASSWORD || '', // Default to empty string if not set
    database: process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if not set
    host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if not set
    dialect: 'mysql', // Using MySQL as default dialect
    dialectOptions: {
      charset: 'utf8mb4', // Ensure the correct charset is being used
      ssl: false, // No SSL in development
    },
    logging: process.env.NODE_ENV === 'development', // Enable logging in development
  },
  production: {
    username: process.env.PROD_DB_USER || 'root', // Use 'root' or value from environment variable
    password: process.env.PROD_DB_PASSWORD || '', // Password for production DB
    database: process.env.PROD_DB_NAME || 'fivver_doup', // Database for production
    host: process.env.PROD_DB_HOST || '127.0.0.1', // Host for production DB
    dialect: 'mysql', // Using MySQL for production
    dialectOptions: {
      charset: 'utf8mb4', // Ensure correct charset in production
      ssl: true, // Enable SSL for production
    },
    logging: false, // Disable logging in production
  },
  test: {
    username: process.env.TEST_DB_USER || 'root', // Test DB user
    password: process.env.TEST_DB_PASSWORD || '', // Test DB password
    database: process.env.TEST_DB_NAME || 'fivver_doup_test', // Test DB name
    host: process.env.DB_HOST || '127.0.0.1', // Test DB host
    dialect: 'mysql', // Using MySQL for testing
    dialectOptions: {
      charset: 'utf8mb4', // Correct charset for test DB
      ssl: false, // No SSL for testing
    },
    logging: false, // Disable logging in test environment
  },
};

// Determine the current environment (default to 'development')
const environment = process.env.NODE_ENV || 'development';

// Ensure the environment is valid
if (!['development', 'production', 'test'].includes(environment)) {
  throw new Error(`Invalid environment: ${environment}`);
}

// Select the configuration based on the environment
const currentConfig = config[environment as 'development' | 'production' | 'test'];

// Parse the database port or fall back to 3306, ensuring it's a valid number
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
if (isNaN(dbPort)) {
  throw new Error(`Invalid DB_PORT: ${process.env.DB_PORT}. Falling back to default 3306.`);
}

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
const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true; // Return true if connection is successful
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    return false; // Return false if there is an error
  }
};

// Export sequelize and testConnection as named exports
export { sequelize, testConnection };
