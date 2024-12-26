// test/teardown.ts

import { sequelize } from '../../src/config/database'; // Adjusted path to go two levels up

export default async function globalTeardown() {
  try {
    // Close the database connection after tests
    await sequelize.close();
    console.log('Global database connection closed.');
  } catch (error) {
    console.error('Error during global teardown:', error);
    throw new Error('Global teardown failed');
  }
}
