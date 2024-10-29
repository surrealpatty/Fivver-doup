const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Define configuration for different environments
const config = {
    development: {
        DB_NAME: process.env.DB_NAME || 'default_dev_db',            // Default dev database name
        DB_USERNAME: process.env.DB_USER || 'default_user',          // Default dev username (changed from DB_USERNAME for consistency with .env variable)
        DB_PASSWORD: process.env.DB_PASSWORD || 'default_password',  // Default dev password
        DB_HOST: process.env.DB_HOST || 'localhost',                 // Default dev host
        DB_DIALECT: process.env.DB_DIALECT || 'mysql',               // Database dialect
        logging: console.log,                                         // Enable logging for SQL queries
    },
    production: {
        DB_NAME: process.env.DB_NAME,                                // Production database name
        DB_USERNAME: process.env.DB_USER,                            // Production username (changed from DB_USERNAME for consistency with .env variable)
        DB_PASSWORD: process.env.DB_PASSWORD,                        // Production password
        DB_HOST: process.env.DB_HOST,                                // Production host
        DB_DIALECT: process.env.DB_DIALECT || 'mysql',               // Database dialect
        logging: false,                                               // Disable logging in production
    },
};

// Determine the current environment and select the appropriate configuration
const env = process.env.NODE_ENV || 'development';                   // Default to development if NODE_ENV is not set
const dbConfig = config[env];                                        // Get the configuration for the current environment

// Initialize Sequelize with the selected configuration
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
    logging: dbConfig.logging,
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log(`Database connection established successfully in ${env} mode.`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit if unable to connect to the database
    });

// Export the sequelize instance for use in other files
module.exports = sequelize;
