require('dotenv').config(); // Load environment variables from .env file

const development = {
    username: process.env.DB_USER || 'default_dev_user',
    password: process.env.DB_PASSWORD || 'default_dev_password',
    database: process.env.DB_NAME || 'fivver_doup_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: console.log, // Enable logging for SQL queries in development
};

const production = {
    username: process.env.PROD_DB_USER || 'default_prod_user',
    password: process.env.PROD_DB_PASSWORD || 'default_prod_password',
    database: process.env.PROD_DB_NAME || 'fivver_doup_db',
    host: process.env.PROD_DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // Disable logging in production
};

const test = {
    username: process.env.TEST_DB_USER || 'test_user',
    password: process.env.TEST_DB_PASSWORD || 'test_password',
    database: process.env.TEST_DB_NAME || 'test_db',
    host: process.env.TEST_DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // Disable logging in tests
};

// Determine the current environment and select the appropriate configuration
const env = process.env.NODE_ENV || 'development';
const dbConfig = {
    development,
    production,
    test,
}[env];

// Validate configuration
const validateConfig = (config) => {
    const requiredKeys = ['username', 'password', 'database', 'host', 'dialect'];
    for (const key of requiredKeys) {
        if (!config[key]) {
            console.error(`Missing configuration key: ${key}`);
            process.exit(1); // Exit if a required key is missing
        }
    }
};

// Validate the selected configuration
validateConfig(dbConfig);

// Export the configuration object for Sequelize
module.exports = dbConfig;
