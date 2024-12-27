import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

// Load the appropriate environment variables
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

// Add debug logs for environment variable validation
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Database Config:', {
  name: process.env.TEST_DB_NAME || process.env.DB_NAME,
  user: process.env.TEST_DB_USER || process.env.DB_USER,
  host: process.env.TEST_DB_HOST || process.env.DB_HOST || '127.0.0.1',
  port: process.env.TEST_DB_PORT || process.env.DB_PORT || 3306,
});

// Configure Sequelize based on environment variables
const sequelize = new Sequelize(
  process.env.TEST_DB_NAME || process.env.DB_NAME || '',
  process.env.TEST_DB_USER || process.env.DB_USER || '',
  process.env.TEST_DB_PASSWORD || process.env.DB_PASSWORD || '',
  {
    host: process.env.TEST_DB_HOST || process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.TEST_DB_PORT || process.env.DB_PORT) || 3306,
    dialect: 'mysql' as Dialect, // Explicitly set the dialect
    logging: process.env.NODE_ENV === 'development', // Enable logging only in development
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined, // SSL for production
    },
  }
);

// Function to test database connection
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
