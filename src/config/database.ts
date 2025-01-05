import dotenv from 'dotenv';  // Import dotenv to load environment variables
import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import { Dialect } from 'sequelize';  // Import Dialect from sequelize package

dotenv.config();  // Load environment variables from .env file

// Define the possible values for the environment type
type Environment = 'development' | 'test' | 'production';

// Determine the environment (development, test, or production)
const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

// Configuration for all environments (development, test, production)
const config: Record<Environment, {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;  // Change from string to Dialect
  ssl: boolean;
}> = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,  // Default to MySQL port 3306
    dialect: 'mysql',  // Dialect is now correctly typed as 'mysql'
    ssl: process.env.DB_USE_SSL === 'true',  // Convert DB_USE_SSL to boolean
  },
  test: {
    username: process.env.TEST_DB_USERNAME || 'root',
    password: process.env.TEST_DB_PASSWORD || 'password',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,  // Default to MySQL port 3306
    dialect: 'mysql',  // Dialect is now correctly typed as 'mysql'
    ssl: process.env.DB_USE_SSL === 'true',  // Convert DB_USE_SSL to boolean
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,  // Default to MySQL port 3306
    dialect: 'mysql',  // Dialect is now correctly typed as 'mysql'
    ssl: process.env.DB_USE_SSL === 'true',  // Convert DB_USE_SSL to boolean
  },
};

// Select the correct config based on environment
const environmentConfig = config[environment];

// Initialize Sequelize with the selected environment configuration
const sequelize = new Sequelize({
  username: environmentConfig.username,
  password: environmentConfig.password,
  database: environmentConfig.database,
  host: environmentConfig.host,
  port: environmentConfig.port,
  dialect: environmentConfig.dialect,  // This is now correctly typed as a Dialect
  models: [  // Include models for sequelize-typescript to use
    require('../models/user').User,
    require('../models/services').Service,
    require('../models/order').Order,
    require('../models/review').Review,
  ],
  logging: environment === 'development' ? console.log : false,  // Enable logging only in development
  define: {
    freezeTableName: true,  // Prevent Sequelize from pluralizing table names
    timestamps: true,  // Enable timestamp fields (createdAt and updatedAt)
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,  // Maximum time (ms) before throwing an error
    idle: 10000,  // Maximum time (ms) before releasing an idle connection
  },
  dialectOptions: {
    charset: 'utf8mb4',  // Ensures support for extended characters like emojis
    collate: 'utf8mb4_unicode_ci',
    ssl: environmentConfig.ssl ? { require: true, rejectUnauthorized: false } : undefined,  // Enable SSL if configured
  },
});

// Export the Sequelize instance for use in other parts of the application
export { sequelize };
