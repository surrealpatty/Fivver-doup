import { Sequelize, Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from .env.test or .env based on NODE_ENV
dotenv.config({ path: process.env.NODE_ENV === 'test' ? './src/.env.test' : './src/.env' });

// Database configuration based on environment
const dbConfig = {
  username: process.env.TEST_DB_USER || 'root',         // Test DB username
  password: process.env.TEST_DB_PASSWORD || '',        // Test DB password
  database: process.env.TEST_DB_NAME || 'fivver_doup', // Test DB name
  host: process.env.TEST_DB_HOST || 'localhost',       // Test DB host
  port: parseInt(process.env.TEST_DB_PORT || '3306'),  // Test DB port
  dialect: 'mysql' as Dialect,                         // Explicitly type dialect as Dialect
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false, // Disable logging for test environment
  }
);

// Test database connection
const connectTestDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Test database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the test database:', error);
    throw error;  // Ensure tests fail if DB connection fails
  }
};

// Export sequelize and test connection function
export { sequelize, connectTestDatabase };
