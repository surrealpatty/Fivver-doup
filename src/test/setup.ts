import * as dotenv from 'dotenv';
dotenv.config({ path: 'src/.env.test' });  // Load environment variables from .env.test

// Import sequelize from your database configuration
import { sequelize } from '../config/database';

export const setup = async () => {
  try {
    // Ensure the test database is connected
    await sequelize.authenticate();
    console.log('Test database connected successfully.');

    // Optionally sync the database (e.g., recreate tables for clean tests)
    await sequelize.sync({ force: true });
    console.log('Test database synced.');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;  // Re-throw error to ensure test setup fails if database setup fails
  }
};
