const path = require('path');
require('dotenv').config();  // Make sure to load environment variables

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',  // Fall back to 'root' if not provided in .env
    password: process.env.DB_PASSWORD || '',  // Default empty password
    database: process.env.DB_NAME || 'fivver_doup',  // Use database name from .env or default
    host: process.env.DB_HOST || 'localhost',  // Default to localhost
    dialect: 'mysql',
    port: process.env.DB_PORT || '3306',  // Default to MySQL's default port
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: `${process.env.DB_NAME}_test` || 'fivver_doup_test',  // Suffix _test for the test DB
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || '3306',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || '3306',
  }
};
