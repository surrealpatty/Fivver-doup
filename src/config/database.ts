import dotenv from 'dotenv';

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
    }
  }
}

// Destructure and validate environment variables with defaults
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306',
  NODE_ENV = 'development',
  JWT_SECRET = 'your-secret-key',
  JWT_EXPIRATION = '1h',
}: NodeJS.ProcessEnv = process.env;

// Validate critical environment variables
if (
  NODE_ENV !== 'test' &&
  (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)
) {
  console.error('Missing required environment variables. Check your .env file.');
  process.exit(1); // Exit the process if critical variables are missing
}

// Ensure that DB_PORT is an integer
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Config object for the application
const config = {
  db: {
    host: DB_HOST as string, // Explicitly cast to string
    user: DB_USER as string, // Explicitly cast to string
    password: DB_PASSWORD as string, // Explicitly cast to string
    database: DB_NAME as string, // Explicitly cast to string
    port: parsedDBPort, // Use parsed value from DB_PORT
  },
  nodeEnv: NODE_ENV as string, // Explicitly cast to string
  JWT_SECRET, // Use as-is since it's required and a string
  JWT_EXPIRATION, // Use as-is since it's already a string
};

export default config;

// Sequelize Database Configuration
import { Sequelize } from 'sequelize';

const sequelizeConfig = {
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

const environment = process.env.NODE_ENV || 'development';
const currentConfig = sequelizeConfig[environment as 'development' | 'production' | 'test'];

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
if (isNaN(dbPort)) {
  throw new Error(`Invalid DB_PORT: ${process.env.DB_PORT}. Falling back to default 3306.`);
}

const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    dialectOptions: currentConfig.dialectOptions,
    logging: currentConfig.logging,
    port: dbPort,
  }
);

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
