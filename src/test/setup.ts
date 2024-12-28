import sequelize from '../config/database'; // Correct default import for sequelize

// Before all tests, authenticate and sync the test database
beforeAll(async () => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Test database connection established.');

    // Sync the database schema with force: true to reset tables
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
