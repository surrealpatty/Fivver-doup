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
    },
    production: {
        username: process.env.PROD_DB_USER || process.env.DB_USER,
        password: process.env.PROD_DB_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.PROD_DB_NAME || process.env.DB_NAME,
        host: process.env.PROD_DB_HOST || process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
    },
};

// Select the appropriate configuration based on the environment
const dbConfig = config[environment];

// Initialize Sequelize with the selected environment configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: environment === 'development', // Enable logging in development only
});

// Use `sequelize` as the default export
export default sequelize;  // <-- Default export here
