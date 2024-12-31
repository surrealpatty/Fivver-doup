import { sequelize } from './src/config/database'; // Import the sequelize instance
import { app } from './src/index'; // Adjust this to the correct path to your app instance

// Global teardown to ensure cleanup of resources after all tests
afterAll(async () => {
  // Close the database connection if it exists
  if (sequelize) {
    await sequelize.close();
    console.log('Database connection closed.');
  }

  // Close the server if it has a close method
  if (app && typeof app.close === 'function') {
    await app.close();
    console.log('Server closed.');
  }
});
