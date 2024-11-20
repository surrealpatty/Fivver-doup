import { Sequelize } from 'sequelize';

// Load environment variables (make sure you have .env file or use environment variables directly)
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Sequelize instance for database connection
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST || 'localhost', // Default to 'localhost' if not provided
  username: DB_USER || 'root',  // Default to 'root' if not provided
  password: DB_PASSWORD || 'password',  // Default to 'password' if not provided
  database: DB_NAME || 'fivver_doup',  // Default to 'fivver_doup' if not provided
  port: parseInt(DB_PORT || '3306', 10),  // Default to 3306 if not provided
  logging: false,  // Disable logging to keep the console clean
  dialectOptions: {
    // Optional: Adjust if necessary for your environment (e.g., SSL, timezone)
    // ssl: { require: true, rejectUnauthorized: false }, // Example for SSL setup
  },
  define: {
    timestamps: false, // Optional: Adjust if you don't want `createdAt` and `updatedAt` fields
  },
});

// Function to test the database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Ensure sequelize connection is properly closed after tests
export const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('Database connection has been closed.');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
};
