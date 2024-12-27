import sequelize from '../config/database'; // Correct, default import
import dotenv from 'dotenv';

// Load environment variables (ensure the correct .env file is being loaded)
dotenv.config({ path: './.env.test' });  // If you have a separate test environment file

// Log environment variables for debugging
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

/**
 * Jest global setup for initializing the test database.
 * Ensures the database is connected and synced before running tests.
 */
export default async function globalSetup() {
  try {
    // Check if all required environment variables are present
    const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_PORT'];
    requiredEnvVars.forEach((variable) => {
      if (!process.env[variable]) {
        throw new Error(`Missing environment variable: ${variable}`);
      }
    });

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
