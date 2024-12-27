import { sequelize } from '../config/database';

const setup = async () => {
  try {
    // Ensure the test database is connected
    await sequelize.authenticate();
    console.log('Connected to the test database.');

    // Optionally sync the database (e.g., recreate tables for clean tests)
    await sequelize.sync({ force: true });
    console.log('Test database synced.');
  } catch (error) {
    console.error('Error setting up test database:', error);
    process.exit(1);
  }
};

export default setup;
