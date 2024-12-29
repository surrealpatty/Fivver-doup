import { Sequelize } from 'sequelize'; // Import Sequelize constructor
import dotenv from 'dotenv'; // To load environment variables

// Load environment variables from a .env file
dotenv.config();

// Set up the test database connection for Sequelize
const sequelize = new Sequelize({
  username: process.env.TEST_DB_USER || 'root', // Use environment variable for DB user, fallback to 'root'
  password: process.env.TEST_DB_PASSWORD || '', // Use environment variable for DB password, fallback to empty string
  database: process.env.TEST_DB_NAME || 'fivver_doup_test', // Use environment variable for DB name, fallback to 'fivver_doup_test'
  host: process.env.TEST_DB_HOST || '127.0.0.1', // Use environment variable for DB host, fallback to '127.0.0.1'
  port: parseInt(process.env.TEST_DB_PORT || '3306', 10), // Use environment variable for DB port, default to 3306
  dialect: 'mysql', // Dialect for MySQL
  logging: false, // Set to false to disable logging for test environment (optional)
});

// Before all tests, authenticate and sync the test database
beforeAll(async () => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Test database connection established.');

    // Sync the database schema with force: true to reset tables before running tests
    await sequelize.sync({ force: true });
    console.log('Test database schema synced.');
  } catch (error) {
    console.error('Error setting up test database:', error instanceof Error ? error.message : error);
    throw error; // Re-throw the error to ensure the test suite fails if setup fails
  }
});

// After all tests, close the database connection
afterAll(async () => {
  try {
    // Close the Sequelize connection
    await sequelize.close();
    console.log('Test database connection closed.');
  } catch (error) {
    console.error('Error closing test database connection:', error instanceof Error ? error.message : error);
  }
});

export { sequelize };
