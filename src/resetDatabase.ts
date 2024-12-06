import   sequelize  from './config/database';
// Function to reset the database
const resetDatabase = async (): Promise<void> => {
  try {
    console.log('Starting database reset process...');

    // Step 1: Drop all tables in the database
    console.log('Dropping all tables...');
    await sequelize.drop(); // Drops all tables
    console.log('Tables dropped successfully.');

    // Step 2: Re-sync models to the database (recreates tables)
    console.log('Re-syncing database...');
    await sequelize.sync({ force: true }); // 'force: true' drops and recreates tables
    console.log('Database re-synced successfully!');
  } catch (error) {
    // Handle errors and log them
    console.error('Error resetting the database:', error);
  } finally {
    // Graceful shutdown after completing the task
    console.log('Database reset process complete.');
    process.exit(0); // Exit the process after completion
  }
};

// Call the function to reset the database
resetDatabase();

