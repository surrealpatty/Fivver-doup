import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define the database configurations for different environments
type DBConfig = Record<
  'development' | 'test' | 'production',
  {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    logging: boolean;
    dialectOptions: {
      charset: string;
      ssl?: { rejectUnauthorized: boolean };
    };
    define: {
      charset: string;
      collate: string;
    };
  }
>;

// Define the configuration object with environment-specific settings
const config: DBConfig = {
  development: {
    username: process.env.DB_USER || 'devuser',
    password: process.env.DB_PASSWORD || 'devpassword',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: true,
    dialectOptions: {
      charset: 'utf8mb4', // Set the charset to utf8mb4
    },
    define: {
      charset: 'utf8mb4', // Ensure the charset is set for Sequelize models
      collate: 'utf8mb4_unicode_ci', // Use a compatible collation
    },
  },
  test: {
    username: process.env.TEST_DB_USER || 'testuser',
    password: process.env.TEST_DB_PASSWORD || 'testpassword',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  },
  production: {
    username: process.env.PROD_DB_USER || 'produser',
    password: process.env.PROD_DB_PASSWORD || 'prodpassword',
    database: process.env.PROD_DB_NAME || 'fivver_doup_prod',
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: { rejectUnauthorized: false },
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  },
};

// Get the current environment (defaults to 'development' if not set)
const environment = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';

// Load the configuration for the current environment
const dbConfig = config[environment];

// Create a Sequelize instance using the configuration
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: dbConfig.logging,
    define: dbConfig.define, // Apply charset and collation to Sequelize models
  }
);

export { sequelize };
