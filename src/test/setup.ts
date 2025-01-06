import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { sequelize } from '../config/database'; // Import the Sequelize instance
import '../models/user'; // Ensure the User model is imported and registered with Sequelize
import '../models/services'; // Import other models as necessary

// Load environment variables from .env file
dotenv.config();

/**
 * Sync the database and reset the schema before running tests.
 */
const syncDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate(); // Authenticate the connection
    console.log('Database connected successfully!');

    console.log('Syncing database schema...');
    await sequelize.sync({ force: true }); // Drop and recreate schema before each test run
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1); // Exit if the connection or sync fails
  }
};

/**
 * Setup and teardown hooks for Jest testing.
 */
beforeAll(async () => {
  console.log('Setting up the test environment...');
  await syncDatabase(); // Sync the database before tests
});

afterAll(async () => {
  console.log('Tearing down the test environment...');
  await sequelize.close(); // Close the database connection after tests complete
});
