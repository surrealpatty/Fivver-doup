import dotenv from 'dotenv';  // Import dotenv to load environment variables
dotenv.config();  // Load environment variables from .env file
import { sequelize } from '../config/database';  // Correct import
import User from '../models/user';  // Import the User model

/**
 * Ensure that Sequelize is aware of all the models
 */
sequelize.models.User = User;  // Manually add the model to Sequelize's models

/**
 * Sync the database and reset the schema before running tests
 */
const syncDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();  // Authenticate the connection
    console.log('Database connected successfully!');

    console.log('Syncing database schema...');
    // Use `force: true` to drop and recreate the schema before each test run
    await sequelize.sync({ force: true });
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);  // Exit the process if the connection or sync fails
  }
};

/**
 * Setup and teardown hooks for Jest testing
 */
beforeAll(async () => {
  console.log('Syncing the database before tests...');
  await syncDatabase();  // Sync the database before running the tests
});

afterAll(async () => {
  console.log('Closing the database connection after tests...');
  await sequelize.close();  // Close the database connection after tests complete
});

// Specify a different port for testing
process.env.PORT = '3001';  // Change the port for testing to 3001 or another available port
