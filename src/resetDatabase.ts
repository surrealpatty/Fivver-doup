export { sequelize };

const resetDatabase = async () => {
  try {
    console.log('Dropping all tables...');
    // Drop all tables in the database
    await sequelize.drop();
    console.log('Tables dropped successfully.');

    console.log('Re-syncing database...');
    // Re-sync models to the database (this may recreate the tables)
    await sequelize.sync({ force: true }); // Set 'force: true' to recreate the tables
    console.log('Database re-synced successfully!');
  } catch (error) {
    console.error('Error resetting the database:', error);
  } finally {
    // Exiting the process after completing the task
    process.exit(0);
  }
};

resetDatabase();
