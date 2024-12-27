import { testConnection } from './src/config/database'; // Adjusted import path
import sequelize from './src/config/database'; // Import sequelize to close the connection after tests

// This setup file runs before any tests are executed
beforeAll(async () => {
  // Test database connection
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Database connection failed. Tests cannot be run.');
  }

  // You can add additional database setup here if needed, like syncing models
  // await sequelize.sync({ force: true }); // Uncomment this line if you want to sync the models before tests
});

// Optionally, clean up by closing the database connection after all tests have run
afterAll(async () => {
  await sequelize.close(); // Ensure the connection is closed after tests
});
