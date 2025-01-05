import { Sequelize } from 'sequelize-typescript'; // Import Sequelize from sequelize-typescript
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

// Determine the environment (development or test)
const isTestEnv = process.env.NODE_ENV === 'test';

// Fetch database credentials from environment variables or fallback to defaults
const DB_USERNAME = isTestEnv ? process.env.TEST_DB_USERNAME : process.env.DB_USERNAME;
const DB_PASSWORD = isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const DB_NAME = isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const DB_HOST = isTestEnv ? process.env.TEST_DB_HOST : process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;  // Default port 3306
const DB_USE_SSL = process.env.DB_USE_SSL === 'true';  // Convert DB_USE_SSL to boolean

// Initialize Sequelize with sequelize-typescript for both dev and test environments
const sequelize = new Sequelize({
  username: DB_USERNAME as string,
  password: DB_PASSWORD as string,
  database: DB_NAME as string,
  host: DB_HOST as string,
  port: DB_PORT,
  dialect: 'mysql',  // Specify MySQL as the dialect
  models: [ // Include models for sequelize-typescript to use
    require('../models/user').User,
    require('../models/services').Service,
    require('../models/order').Order,
    require('../models/review').Review
  ],
  logging: process.env.NODE_ENV === 'development' ? console.log : false,  // Enable logging only in development
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
    ssl: DB_USE_SSL ? { require: true, rejectUnauthorized: false } : undefined,  // Enable SSL if configured
  },
});

// Export the Sequelize instance for use in other parts of the application
export { sequelize };
