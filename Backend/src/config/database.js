// src/config/database.js

require('dotenv').config(); // Ensure .env is loaded at the start

// Database configurations for different environments
const development = {
    username: process.env.DB_USER || 'default_dev_user',
    password: process.env.DB_PASSWORD || 'default_dev_password',
    database: process.env.DB_NAME || 'fivver_doup_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: console.log,
};

const production = {
    username: process.env.PROD_DB_USER || 'default_prod_user',
    password: process.env.PROD_DB_PASSWORD || 'default_prod_password',
    database: process.env.PROD_DB_NAME || 'fivver_doup_db',
    host: process.env.PROD_DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
};

const test = {
    username: process.env.TEST_DB_USER || 'test_user',
    password: process.env.TEST_DB_PASSWORD || 'test_password',
    database: process.env.TEST_DB_NAME || 'test_db',
    host: process.env.TEST_DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
};

// Determine the current environment and select the appropriate config
const env = process.env.NODE_ENV || 'development';
const dbConfig = { development, production, test }[env];

// Function to validate the configuration
const validateConfig = (config) => {
    const requiredKeys = ['username', 'password', 'database', 'host', 'dialect'];
    for (const key of requiredKeys) {
        if (!config[key]) {
            console.error(`Missing configuration key: ${key}`);
            process.exit(1); // Exit the process if a required key is missing
        }
    }
};

// Validate the database configuration
validateConfig(dbConfig);

// Sequelize setup and connection
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
});

// Test the connection to ensure the database is reachable
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection to the ${env} database has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the test connection function
testConnection();

// Export the sequelize instance for use in other parts of the application
module.exports = sequelize;
