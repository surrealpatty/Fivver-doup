const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Set the correct environment variables based on the environment
const dbConfig = {
    database: isProduction ? process.env.PROD_DB_NAME : process.env.DB_NAME,
    username: isProduction ? process.env.PROD_DB_USER : process.env.DB_USER,
    password: isProduction ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD,
    host: isProduction ? process.env.PROD_DB_HOST : process.env.DB_HOST,
    dialect: 'mysql', // Dialect is fixed as MySQL
    logging: false, // Turn off SQL query logging
};

// Check if all required environment variables are set
const requiredEnvVars = [
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'NODE_ENV',
];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`FATAL ERROR: Environment variable ${envVar} is not defined.`);
        process.exit(1); // Exit the process if any variable is missing
    }
});

// Create a new Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
});

// Test the database connection
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

// Export the sequelize instance for use in other files
module.exports = sequelize;
