// config/config.js

require('dotenv').config(); // Make sure dotenv is loaded to access environment variables

// Destructure environment variables or set default values
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',  // Default empty string, it should be provided in .env
  DB_NAME = 'fivver_doup',
  DB_PORT = '3306',  // Default MySQL port
  NODE_ENV = 'development',  // Default to 'development' if not set
} = process.env;

// Ensure DB_PORT is a valid number
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
  console.error('DB_PORT must be a valid number.');
  process.exit(1);
}

// Export different configurations based on the environment
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    port: parsedDBPort,
    logging: true,  // Enable logging in development
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,  // Separate test database
    host: DB_HOST,
    dialect: 'mysql',
    port: parsedDBPort,
    logging: false,  // Disable logging in tests
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_prod`,  // Separate production database
    host: DB_HOST,
    dialect: 'mysql',
    port: parsedDBPort,
    logging: false,  // Disable logging in production
  },
};
