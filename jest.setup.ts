import { sequelize } from './src/config/database'; // Adjust the path to your Sequelize config

/**
 * Global setup for tests.
 * Ensures any required configuration or mocking is performed before tests run.
 */

/**
 * Global teardown logic.
 * Ensures database connections and other resources are properly closed
 * after all tests are executed.
 */
afterAll(async () => {
  try {
    // Close the Sequelize database connection to prevent hanging processes
    await sequelize.close();
    console.log('Database connection closed successfully.');
  } catch (error) {
    console.error('Error while closing the database connection:', error);
  }
});
