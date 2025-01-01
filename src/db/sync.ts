// src/db/sync.ts
import sequelize from '../config/database';  // Correct way to import default export
import User from '../models/user'; // Adjust import path as needed

// Function to sync database and create tables
async function syncDatabase() {
  try {
    // Force sync will drop and recreate the tables
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Call the sync function
syncDatabase();
