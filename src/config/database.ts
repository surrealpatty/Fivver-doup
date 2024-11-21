import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Destructure environment variables with default values
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'database_name',
  DB_PORT = '3306',
  NODE_ENV = 'development',
} = process.env;

// Validate critical environment variables
if (!DB_NAME) {
  console.error('Missing required database name. Please check your .env file for DB_NAME.');
  process.exit(1);
}

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(DB_PORT, 10), // Convert port to an integer
  logging: NODE_ENV === 'development' ? console.log : false, // Enable logging in development
  dialectOptions: {
    timezone: 'Z', // Use UTC for MySQL queries
  },
  define: {
    timestamps: true, // Add timestamps to models by default
  },
});

// Function to test the database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit the process on connection failure
  }
};

// Automatically test the connection unless in the test environment
if (NODE_ENV !== 'test') {
  testConnection().catch((error) => {
    console.error('Unhandled error during database connection test:', error);
    process.exit(1);
  });
}

// Export Sequelize instance for use in models
export { sequelize };
