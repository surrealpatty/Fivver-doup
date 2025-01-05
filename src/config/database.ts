import dotenv from 'dotenv'; // Load environment variables from the .env file
import { Sequelize } from 'sequelize-typescript'; // Import Sequelize with TypeScript support

dotenv.config(); // Load environment variables

// Extract current environment and set defaults
const environment = process.env.NODE_ENV || 'development';

// Map environment variables for database configuration
const DB_USERNAME = 
  environment === 'test' ? process.env.TEST_DB_USERNAME || 'test_user' : process.env.DB_USERNAME || 'root';
const DB_PASSWORD = 
  environment === 'test' ? process.env.TEST_DB_PASSWORD || 'test_password' : process.env.DB_PASSWORD || 'password';
const DB_NAME = 
  environment === 'test' ? process.env.TEST_DB_NAME || 'fivver_doup_test' : process.env.DB_NAME || 'fivver_doup';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USE_SSL = process.env.DB_USE_SSL === 'true';

// Configure Sequelize with options
const sequelize = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  models: [ // Include models for sequelize-typescript
    require('../models/user').User,
    require('../models/services').Service,
    require('../models/order').Order,
    require('../models/review').Review,
  ],
  logging: environment === 'development' ? console.log : false, // Enable logging only in development
  define: {
    freezeTableName: true, // Prevent table name pluralization
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000, // Max time (ms) before throwing an error
    idle: 10000, // Max time (ms) before releasing an idle connection
  },
  dialectOptions: {
    charset: 'utf8mb4', // Support extended characters
    collate: 'utf8mb4_unicode_ci',
    ssl: DB_USE_SSL
      ? { require: true, rejectUnauthorized: false } // Enable SSL if required
      : undefined,
  },
});

// Export the Sequelize instance for use across the application
export { sequelize };
