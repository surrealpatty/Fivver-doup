import { Sequelize } from 'sequelize'; // Import Sequelize constructor

// Set up the test database connection for Sequelize
const sequelize = new Sequelize({
  username: 'testuser', // Ensure this is the correct test database username
  password: 'testpassword', // Ensure this is the correct password for the test user
  database: 'fivver_doup_test', // Test database name, ensure it exists
  host: '127.0.0.1', // Database host (usually localhost or 127.0.0.1)
  port: 3306, // MySQL default port
  dialect: 'mysql', // Dialect for MySQL
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    console.error('Error closing test database connection:', error instanceof Error ? error.message : error);
  }
});

export { sequelize };
