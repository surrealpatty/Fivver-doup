"use strict";
// Import necessary modules
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from the .env file
// Import the config object containing the database configurations for different environments
const config = require('./config'); // Adjust the path to match your actual file structure
// Determine the environment (default to 'development' if not specified)
const environment = process.env.NODE_ENV || 'development';
// Ensure the config object contains the database configuration for the current environment
const dbConfig = config[environment]?.db;
if (!dbConfig) {
    console.error(`No database configuration found for environment: ${environment}`);
    process.exit(1); // Exit if no config is found
}
// Create a new Sequelize instance using the environment-specific database configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Disable logging in production (set to true in development if needed)
});
// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};
// Run the connection test
testConnection();
// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;
//# sourceMappingURL=database.js.map