import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// List of required environment variables for validation
const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT'];

// Function to validate the presence of required environment variables
const validateEnvVars = () => {
    for (const key of requiredKeys) {
        if (!process.env[key]) {
            console.error(`Missing environment variable: ${key}`);
            process.exit(1); // Exit the process if any required environment variable is missing
        }
    }
};

// Validate environment variables
validateEnvVars();

// Define the configuration object with settings for both 'development' and 'production' environments
const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql', // Default to 'mysql' if DB_DIALECT is not set
    },
    production: {
        username: process.env.PROD_DB_USER || process.env.DB_USER, // Fallback to dev username if PROD_DB_USER is not set
        password: process.env.PROD_DB_PASSWORD || process.env.DB_PASSWORD, // Fallback to dev password if PROD_DB_PASSWORD is not set
        database: process.env.PROD_DB_NAME || process.env.DB_NAME, // Fallback to dev database if PROD_DB_NAME is not set
        host: process.env.PROD_DB_HOST || process.env.DB_HOST, // Fallback to dev host if PROD_DB_HOST is not set
        dialect: process.env.DB_DIALECT || 'mysql', // Default to 'mysql' if DB_DIALECT is not set
    },
};

export default config; // Export the configuration object as the default export
