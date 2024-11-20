import { Sequelize } from 'sequelize';

// Sequelize instance for database connection
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root', // Ensure this is the correct username
  password: 'password', // Ensure this is the correct password
  database: 'fivver_doup',
  port: 3306, // Add this line if needed for non-default ports
  logging: false, // Disable logging to keep console clean
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
