import { sequelize } from '../src/config/database'; // Adjust the import path to your sequelize instance

export default async function globalTeardown() {
  try {
    // Close the database connection after tests are completed
    await sequelize.close();
    console.log('Global database connection closed.');
  } catch (error) {
    console.error('Error during global teardown:', error);
    throw new Error('Global teardown failed');
  }
}
