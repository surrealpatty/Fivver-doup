const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Determine the environment
const isProduction = process.env.NODE_ENV === 'production';

// Create a new Sequelize instance
const sequelize = new Sequelize(
    isProduction ? process.env.PROD_DB_NAME : process.env.DB_NAME,
    isProduction ? process.env.PROD_DB_USER : process.env.DB_USER,
    isProduction ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD,
    {
        host: isProduction ? process.env.PROD_DB_HOST : process.env.DB_HOST,
        dialect: process.env.DB_DIALECT, // Use the dialect specified in .env
        logging: false, // Set to true if you want to see SQL queries
    }
);

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the function to test the connection
testConnection();

module.exports = sequelize; // Export the sequelize instance
