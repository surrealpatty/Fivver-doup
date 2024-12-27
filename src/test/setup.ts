import dotenv from 'dotenv';
import { sequelize } from '../config/database'; // Ensure the correct path to your sequelize instance

// Load test-specific environment variables
dotenv.config({ path: '.env.test' });

const setupTestDatabase = async () => {
  try {
    // Ensure the database connection works
    await sequelize.authenticate();
    console.log('Test database connected successfully.');
  } catch (error) {
    console.error('Error connecting to the test database:', error);
    process.exit(1);
  }
};

// Call the setup function
setupTestDatabase();
