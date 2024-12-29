import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Sequelize instance using environment variables with fallbacks
const sequelize = new Sequelize(
  process.env.DB_NAME || 'fivver_doup_test',
  process.env.DB_USER || 'testuser',
  process.env.DB_PASSWORD || 'testpassword',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    logging: false, // Disable Sequelize query logging during tests
  }
);

// Establish the database connection before all tests
beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Test database connection established successfully.');
    await sequelize.sync({ force: true }); // Ensure a clean slate for tests
  } catch (error) {
    console.error('❌ Unable to connect to the test database:', error);
    throw new Error('Failed to set up test database connection');
  }
});

// Close the database connection after all tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log('✅ Test database connection closed successfully.');
  } catch (error) {
    console.error('❌ Error closing the test database connection:', error);
  }
});

export { sequelize }; // Export sequelize for use in tests
