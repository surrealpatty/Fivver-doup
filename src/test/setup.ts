// src/test/setup.ts
import { sequelize } from '../config/database';  // Import sequelize instance

// Sync the database and run before tests
export const syncDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();  // Authenticate the connection
    console.log('Database connected successfully!');
    
    console.log('Syncing database schema...');
    await sequelize.sync({ force: true });  // Use force: true for fresh schema in tests
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);  // Exit the process if the connection or sync fails
  }
};

// Ensure syncDatabase is called before running tests
beforeAll(async () => {
  await syncDatabase();  // Sync database before tests run
});

// Ensure the connection is closed after tests
afterAll(async () => {
  await sequelize.close();  // Close the connection after tests complete
});
