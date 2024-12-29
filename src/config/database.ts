import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define the database configurations for different environments
type DBConfig = Record<
  'development' | 'test' | 'production',
  {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: Dialect;
    logging: boolean; // Ensure logging is explicitly included
    dialectOptions: {
      charset: string;
      ssl?: boolean | { rejectUnauthorized: boolean }; // Optional for production
    };
  }
>;

// Create the configuration object
const config: DBConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: true,
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: { rejectUnauthorized: false }, // Example SSL setting for production
    },
  },
};

// Get the current environment (defaults to 'development' if not set)
const environment = (process.env.NODE_ENV as keyof DBConfig) || 'development';

// Load the configuration for the current environment
const dbConfig = config[environment];

// Ensure `dialect` is correctly typed as `Dialect`
const sequelize = new Sequelize(
  dbConfig.database!,
  dbConfig.username!,
  dbConfig.password!,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect, // Already correctly typed
    dialectOptions: dbConfig.dialectOptions,
    logging: dbConfig.logging, // This will always exist
  }
);

export { sequelize };
