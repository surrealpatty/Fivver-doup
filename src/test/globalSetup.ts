import * as dotenv from 'dotenv';
import { sequelize } from '../config/database';

// Load environment variables from .env.test file
dotenv.config({ path: './src/.env.test' });

/**
 * Global setup function for Jest.
 * Ensures the test database is initialized and synced before running tests.
 */
export default async function globalSetup() {
  try {
    // Authenticate the test database connection
    await sequelize.authenticate();
    console.log('Test database connected successfully.');

    // Sync the database, forcing table creation to ensure a clean state
    await sequelize.sync({ force: true });
    console.log('Test database synced.');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error; // Ensure Jest stops if the database setup fails
  }
}
