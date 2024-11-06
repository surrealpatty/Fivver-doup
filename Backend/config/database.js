const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Determine the environment
const isProduction = process.env.NODE_ENV === 'production';

// Check for required environment variables
const requiredEnvVars = [
    isProduction ? 'PROD_DB_NAME' : 'DB_NAME',
    isProduction ? 'PROD_DB_USER' : 'DB_USER',
    isProduction ? 'PROD_DB_PASSWORD' : 'DB_PASSWORD',
    isProduction ? 'PROD_DB_HOST' : 'DB_HOST',
    'NODE_ENV'
];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`FATAL ERROR: ${varName} is not defined.`);
        process.exit(1);
    }
});

// Create a new Sequelize instance
const sequelize = new Sequelize(
    isProduction ? process.env.PROD_DB_NAME : process.env.DB_NAME, // Database name
    isProduction ? process.env.PROD_DB_USER : process.env.DB_USER, // Username
    isProduction ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD, // Password
    {
        host: isProduction ? process.env.PROD_DB_HOST : process.env.DB_HOST, // Host
        dialect: 'mysql', // Hardcoded to 'mysql', as the dialect can be set directly
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
