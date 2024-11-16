// src/resetDatabase.js
const { sequelize } = require('./config/database'); // Correct path based on your structure


const resetDatabase = async () => {
  try {
    console.log('Dropping tables...');
    await sequelize.drop(); // Drop all tables
    console.log('Re-syncing database...');
    await sequelize.sync(); // Re-sync all models with the database
    console.log('Database reset successfully!');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    process.exit();
  }
};

resetDatabase();
