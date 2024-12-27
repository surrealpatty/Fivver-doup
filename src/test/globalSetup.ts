import * as dotenv from 'dotenv';
import sequelize from '../config/database'; // Correct, default import


// Load the environment variables for the test environment
dotenv.config({ path: './src/.env.test' });

/**
 * Jest global setup for initializing the test database.
 * Ensures the database is connected and synced before running tests.
 */
export default async function globalSetup() {
  try {
    // Establish a connection to the test database
    await sequelize.authenticate();
    console.log('Test database connection established successfully.');

    // Sync the database and reset the schema
    await sequelize.sync({ force: true }); // Force drops and recreates tables
    console.log('Test database schema synced successfully.');
  } catch (error) {
    console.error('Error during test database setup:', error);
    throw error; // Propagate the error to stop Jest if setup fails
  }
}
