import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// List of required environment variables
const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT'];

// Function to validate the presence of required environment variables
const validateEnvVars = () => {
    for (const key of requiredKeys) {
        if (!process.env[key]) {
            console.error(`Missing environment variable: ${key}`);
            process.exit(1);  // Exit if a required environment variable is missing
        }
    }
};

// Validate environment variables
validateEnvVars();

// Get the environment setting (development by default)
const environment = process.env.NODE_ENV || 'development';

// Define configuration object based on the environment
const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',  // Default to MySQL if not set
        logging: true,  // Enable logging in development
    },
    production: {
        username: process.env.PROD_DB_USER || process.env.DB_USER,
        password: process.env.PROD_DB_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.PROD_DB_NAME || process.env.DB_NAME,
        host: process.env.PROD_DB_HOST || process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,  // Disable logging in production
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.TEST_DB_NAME || 'test_db', // Optional test DB
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,  // Disable logging in test environment
    },
};

// Select the appropriate configuration based on the environment
const dbConfig = config[environment];

// Initialize Sequelize with the selected environment configuration
const sequelize = require('../config/database');
    dialect: dbConfig.dialect,
    logging: dbConfig.logging; // Add semicolon here


// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connection established successfully.'))
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit if connection fails
    });

// Export the sequelize instance for use in models
export default sequelize;
