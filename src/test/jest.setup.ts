// src/test/jest.setup.ts
import { sequelize } from '../config/database';  // Correct import

afterAll(async () => {
  // Close the database connection after all tests have completed
  await sequelize.close();
  console.log('Database connection closed');
});
