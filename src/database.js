const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Update the path according to your directory structure
const config = require('./config'); // Ensure this path is correct

// Determine the environment (development by default)
const environment = process.env.NODE_ENV || 'development';

// Ensure that the config object contains the database configuration for the current environment
const dbConfig = config[environment]?.db;

// Check if the database config is defined
if (!dbConfig) {
    console.error(`No database configuration found for environment: ${environment}`);
    process.exit(1); // Exit if no config found
}

// Create a new Sequelize instance using the environment-specific configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Disable logging for production, enable in development if needed
});

// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1); // Exit if connection fails
    }
};

// Run the connection test
testConnection();

// Export the sequelize instance for use in other parts of the application
module.exports = sequelize;
