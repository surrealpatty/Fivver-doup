const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Determine the current environment or default to 'development'
const env = process.env.NODE_ENV || 'development';

// Export the database configuration based on the environment
module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: true,  // Enable logging in development
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',  // Use root or specific test user
    password: process.env.TEST_DB_PASSWORD || 'testpassword',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,  // Disable logging in tests
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,  // Disable logging in production
  },
};
