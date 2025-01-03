// Import reflect-metadata if you're using TypeORM or any other libraries that rely on decorators.
import 'reflect-metadata';

// Import the sequelize instance as a named import
import { sequelize } from './src/config/database'; // Corrected to use named import

// Global setup before all tests
beforeAll(async () => {
  // Initialize the database connection if needed
  try {
    await sequelize.authenticate();
    console.log('Database connection established for testing.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Fail tests if the database cannot connect
  }
});

// Clean up states after each test
afterEach(() => {
  // You can reset mocks, clear caches, or reset any shared state here if needed
  jest.clearAllMocks();
});

// Global teardown after all tests
afterAll(async () => {
  // Close the database connection after all tests are complete
  try {
    await sequelize.close();
    console.log('Database connection closed after testing.');
  } catch (error) {
    console.error('Error while closing the database connection:', error);
  }
});
