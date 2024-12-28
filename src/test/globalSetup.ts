import dotenv from 'dotenv';
import sequelize from '../config/database'; // Correct, default import

// Load the .env.test file for the test environment
dotenv.config({ path: './.env.test' }); 

// Log environment variables for debugging
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

/**
 * Jest global setup for initializing the test database.
 * Ensures the database is connected and synced before running tests.
 */
export default async function globalSetup() {
  try {
    // Destructure the environment variables for easier access
    const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

    // Check if all required environment variables are present
    if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_HOST || !DB_PORT) {
      throw new Error('Missing required environment variables');
    }

    // Log for debugging to ensure values are correct
    console.log('Using database:', DB_NAME);
    console.log('Connecting to DB at:', DB_HOST, 'on port', DB_PORT);

    // Establish a connection to the test database
    await sequelize.authenticate();
    console.log('Test database connection established successfully.');

    // Sync the database and reset the schema (force drop and recreate tables)
    await sequelize.sync({ force: true });
    console.log('Test database schema synced successfully.');

  } catch (error) {
    console.error('Error during test database setup:', error);
    throw error; // Propagate the error to stop Jest if setup fails
  }
}
