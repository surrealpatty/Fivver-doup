import { Sequelize, Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from the correct .env file based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? 'src/.env.test' : 'src/.env',
});

// Log environment variables for debugging purposes (remove in production)
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Database Configuration:', {
  name: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  user: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DB_USER,
  host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST || '127.0.0.1',
  port: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PORT : process.env.DB_PORT || 3306,
});

// Ensure environment variables are set or throw an error if undefined
const dbName = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const dbUser = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DB_USER;
const dbPassword = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const dbHost = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PORT : process.env.DB_PORT || 3306;

// Throw an error if any required environment variables are missing
if (!dbName || !dbUser || !dbPassword) {
  throw new Error('Missing database configuration in environment variables.');
}

// Configure Sequelize based on environment variables
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: Number(dbPort),
  dialect: 'mysql' as Dialect,
  logging: process.env.NODE_ENV === 'development', // Enable logging in development only
  dialectOptions: {
    charset: 'utf8mb4',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  },
});

// Function to test the database connection
const initializeDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit if the connection fails
  }
};

export { sequelize, initializeDatabase };
