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
  NODE_ENV,
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
    ssl: useSSL, // Use SSL if DB_SSL is 'true'
  },
  define: {
    freezeTableName: true, // To prevent Sequelize from pluralizing table names
    charset: 'utf8mb4', // Ensure correct charset to avoid encoding issues
    collate: 'utf8mb4_unicode_ci', // Set collation to match charset
  },
  pool: {
    acquire: 30000, // Increase timeout to avoid connection errors
    idle: 10000,
  },
  // Adding additional option to avoid connection encoding errors
  query: {
    raw: true, // Ensures that results are returned as plain objects
    nest: true, // Ensures nested results are properly handled
  },
});

// Test the database connection and sync models
const testConnection = async (): Promise<void> => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models with the database
    await sequelize.sync({ alter: true }); // Syncs models with the database, altering tables if needed
    console.log('Database tables synced.');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database:', error);
    }
    process.exit(1); // Exit the process if the connection fails
  }
};

// Test the connection and sync models on script run
testConnection();

export { sequelize, testConnection };
