import dotenv from 'dotenv';
import { testConnection } from './src/config/database'; // Adjust the import path as necessary
import sequelize from './src/config/database'; // Import sequelize to close the connection after tests

// Load environment variables from the `.env.test` file
dotenv.config({ path: './.env.test' }); // Ensure .env.test is loaded

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
beforeAll(async () => {
  // Test database connection
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Database connection failed. Tests cannot be run.');
  }

  // Optionally, sync your models here if needed before tests
  // await sequelize.sync({ force: true }); // Uncomment this line if you want to sync the models before tests
});

afterAll(async () => {
  await sequelize.close(); // Ensure the connection is closed after tests
});
