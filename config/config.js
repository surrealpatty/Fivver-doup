require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',    // Default to 'root' if DB_USER is not set
    password: process.env.DB_PASSWORD || '',    // Default to empty string if not set
    database: process.env.DB_NAME || 'fivver_doup',  // Default to 'fivver_doup' if not set
    host: process.env.DB_HOST || 'localhost',   // Default to 'localhost' if not set
    dialect: 'mysql',
    logging: false,  // Disable logging or set to true for more detailed logs
  },
  test: {
    username: process.env.DB_USER || 'root',    // Use the same environment variable name for consistency
    password: process.env.DB_PASSWORD || '',    // Default to empty string if not set
    database: process.env.TEST_DB_NAME || 'fivver_doup_test', // Use TEST_DB_NAME for test database
    host: process.env.DB_HOST || 'localhost',   // Default to 'localhost' if not set
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',    // Use the same environment variable name for consistency
    password: process.env.DB_PASSWORD || '',    // Default to empty string if not set
    database: process.env.DB_NAME || 'fivver_doup',    // Use DB_NAME for production DB
    host: process.env.DB_HOST || 'localhost',   // Default to 'localhost' if not set
    dialect: 'mysql',
  },
};
