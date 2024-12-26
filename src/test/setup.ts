
import { sequelize } from '../config/database'; // Adjust path if necessary

// Global setup function for Jest
export default async function globalSetup() {
  try {
    // Attempt to authenticate the Sequelize connection to the test database
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    // Log any errors related to the database connection
    console.error('Database connection error:', error);
    throw error; // Rethrow error to prevent tests from running if DB connection fails
  }
}
