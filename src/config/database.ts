import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Destructure environment variables from the .env file
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_SSL,
  NODE_ENV
} = process.env;

// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error('Missing required database environment variables');
}

// Convert DB_SSL to a boolean value if it's set to 'true'
const useSSL = DB_SSL === 'true';

// Create a new Sequelize instance with the given environment variables
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql', // Ensure correct dialect type
  logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development
  dialectOptions: {
    charset: 'utf8mb4',  // Ensure correct charset to avoid encoding issues
    ssl: useSSL,         // Use SSL if DB_SSL is 'true'
    // Removed rejectUnauthorized for now as it may cause issues with some SSL configurations
  },
});

// Test the database connection
const testConnection = async (): Promise<void> => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database:', error);
    }
    process.exit(1);  // Exit the process if the connection fails
  }
};

// Test the connection on script run
testConnection();

export { sequelize, testConnection };
