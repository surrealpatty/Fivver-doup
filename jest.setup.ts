import { sequelize } from './src/config/database'; // Import your sequelize instance

beforeAll(async () => {
  try {
    // Authenticate the Sequelize connection before tests start
    await sequelize.authenticate();
    console.log('Database connected for tests');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message || error);
    // Optionally, you can fail the tests if the connection fails
    process.exit(1);
  }
});

afterAll(async () => {
  try {
    // Close the Sequelize connection to prevent hanging processes after tests
    await sequelize.close();
    console.log('Database connection closed successfully.');
  } catch (error: any) {
    console.error('Error while closing the database connection:', error);
  }
});
