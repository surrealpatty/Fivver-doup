require('dotenv').config(); // Load environment variables

const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT'];

// Function to validate the presence of required environment variables
const validateEnvVars = () => {
    for (const key of requiredKeys) {
        if (!process.env[key]) {
            console.error(`Missing environment variable: ${key}`);
            process.exit(1); // Exit if a required environment variable is missing
        }
    }
};

// Validate environment variables
validateEnvVars();

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql', // Default to 'mysql' if not set
    },
    production: {
        username: process.env.PROD_DB_USER || process.env.DB_USER, // Fallback to dev user if prod not set
        password: process.env.PROD_DB_PASSWORD || process.env.DB_PASSWORD, // Fallback to dev password if prod not set
        database: process.env.PROD_DB_NAME || process.env.DB_NAME, // Fallback to dev db if prod not set
        host: process.env.PROD_DB_HOST || process.env.DB_HOST, // Fallback to dev host if prod not set
        dialect: process.env.DB_DIALECT || 'mysql', // Default to 'mysql' if not set
    },
};

module.exports = config;
