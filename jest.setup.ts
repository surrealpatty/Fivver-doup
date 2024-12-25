import { sequelize } from './src/config/database'; // Import your sequelize instance

/**
 * Global setup for Jest tests.
 * Ensures the database connection is established before tests run.
 */
beforeAll(async () => {
  try {
    // Authenticate the Sequelize connection before tests start
    await sequelize.authenticate();
    console.log('Database connected for tests');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message || error);
    // Optionally, you can fail the tests if the connection fails,
    // but avoid process.exit(1) in test environments.
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1); // Exit only if not in a test environment
    }
  }
});

/**
 * Global teardown for Jest tests.
 * Ensures the database connection is closed after tests are done.
 */
afterAll(async () => {
  try {
    // Close the Sequelize connection to prevent hanging processes after tests
    await sequelize.close();
    console.log('Database connection closed successfully.');
  } catch (error: any) {
    console.error('Error while closing the database connection:', error);
  }
});
