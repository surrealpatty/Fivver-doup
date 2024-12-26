import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// Define the Sequelize configuration interface
interface SequelizeConfig {
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
  port?: number;  // Optional port for flexibility
}

// Sequelize Database Configuration for different environments
const sequelizeConfig: { [key: string]: SequelizeConfig } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: process.env.NODE_ENV === 'development',
  },
  production: {
    username: process.env.PROD_DB_USER || 'root',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'fivver_doup',
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: true,
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
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: false,
  },
};

// Select the configuration based on the current environment
const environment = process.env.NODE_ENV || 'development';  // Default to 'development' if NODE_ENV is not set
const currentConfig = sequelizeConfig[environment];

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
    dialect: currentConfig.dialect as 'mysql',
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

// Export sequelize and testConnection for use in other parts of the application
export { sequelize, testConnection };
