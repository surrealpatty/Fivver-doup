// syncDatabase.js
const { sequelize } = require('./src/models'); // Adjust path to where your sequelize instance is defined

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates tables
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    process.exit(0); // Exits after sync is complete
  }
}

syncDatabase();

