// src/test/globalTeardown.ts

import { sequelize } from '../config/database'; // Adjust path based on your project structure
import { server } from '../index';  // Adjust path based on your project structure

// Global teardown to ensure cleanup of resources after all tests
afterAll(async () => {
  // Close the database connection if it exists
  if (sequelize) {
    await sequelize.close();
    console.log('Database connection closed.');
  }

  // Close the server if it has a close method (now using the HTTP server)
  if (server && typeof server.close === 'function') {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
        console.log('Server closed.');
      });
    });
  }
});
