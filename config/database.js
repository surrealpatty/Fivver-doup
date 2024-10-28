const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Define configuration for different environments
const config = {
    development: {
        database: process.env.DB_NAME || 'default_dev_db',            // Default dev database name
        username: process.env.DB_USERNAME || 'default_user',          // Default dev username (adjusted variable name)
        password: process.env.DB_PASSWORD || 'default_password',      // Default dev password (adjusted variable name)
        host: process.env.DB_HOST || 'localhost',                     // Default dev host
        dialect: process.env.DB_DIALECT || 'mysql',                   // Database dialect
        logging: console.log,                                         // Enable logging for SQL queries
    },
    production: {
        database: process.env.DB_NAME,                                // Production database name
        username: process.env.DB_USERNAME,                            // Production username
        password: process.env.DB_PASSWORD,                            // Production password
        host: process.env.DB_HOST,                                    // Production host
        dialect: process.env.DB_DIALECT || 'mysql',                   // Database dialect
        logging: false,                                               // Disable logging in production
    },
};

// Determine the current environment and select the appropriate configuration
const env = process.env.NODE_ENV || 'development';                   // Default to development if NODE_ENV is not set
const dbConfig = config[env];                                        // Get the configuration for the current environment

// Initialize Sequelize with the selected configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
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
