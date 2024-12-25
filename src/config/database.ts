import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the database configuration object with environment-specific settings
const config: {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    dialectOptions: {
      charset: string;
      ssl: boolean;
    };
    logging: boolean;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    dialectOptions: {
      charset: string;
      ssl: boolean;
    };
    logging: boolean;
  };
  test: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    dialectOptions: {
      charset: string;
      ssl: boolean;
    };
    logging: boolean;
  };
} = {
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
    logging: process.env.NODE_ENV === 'development', // Enable logging in development
  },
  production: {
    username: process.env.PROD_DB_USER || 'root',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'fivver_doup',
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
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
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: false,
  },
};

// Explicitly define the type of the environment variable
type Environment = keyof typeof config; // 'development' | 'production' | 'test'

// Use environment variable (default to 'development')
const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

// Access the appropriate config based on the environment
const currentConfig = config[environment];

// Create and export the Sequelize instance with the selected configuration
export const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    dialectOptions: currentConfig.dialectOptions,
    logging: currentConfig.logging,
    port: Number(process.env.DB_PORT) || 3306, // Use the DB_PORT environment variable if set, else default to 3306
  }
);

// Function to test the database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error instanceof Error ? error.message : error
    );
    return false;
  }
};
