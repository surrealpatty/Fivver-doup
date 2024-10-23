const { Sequelize } = require('sequelize');
const config = require('./config'); // Ensure this points to the correct config file

// Determine the environment (development, production, etc.)
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Try to authenticate the connection
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message); // Log the error message for clarity
    }
};

// Call the test function
testConnection();

// Export the Sequelize instance for use in other modules
module.exports = sequelize; // Exporting just the sequelize instance is sufficient
