require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DB_USER,    // Make sure this matches the .env variable name
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,  // Disable logging or set to true for more detailed logs
  },
  test: {
    username: process.env.DB_USER,    // Use the same environment variable name for consistency
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,  // Make sure this matches the .env variable name for the test DB
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,    // Use the same environment variable name for consistency
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,    // Production DB should use DB_NAME
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
