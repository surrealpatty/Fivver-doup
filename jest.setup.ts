import { Sequelize } from 'sequelize';

// Import your Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'fivver_doup_test',
  process.env.DB_USER || 'testuser',
  process.env.DB_PASSWORD || 'testpassword',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
  }
);

// Establish the database connection before tests
beforeAll(async () => {
  try {
    await sequelize.authenticate(); // Ensure the connection is established before running tests
    console.log('Test database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Fail the test setup if the database connection fails
  }
});

// Close the database connection after all tests are done
afterAll(async () => {
  try {
    await sequelize.close(); // Close the Sequelize connection
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
});
