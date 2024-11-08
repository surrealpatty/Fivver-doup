import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// List of required environment variables
const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT'];

// Function to check if all required environment variables are present
const checkEnvVariables = () => {
    for (const key of requiredKeys) {
        if (!process.env[key]) {
            console.error(`Missing required environment variable: ${key}`);
            process.exit(1);  // Exit the process if any required variable is missing
        }
    }
};

// Check if all required environment variables are present
checkEnvVariables();

// Create a new Sequelize instance with the loaded environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name from .env
    process.env.DB_USER,      // Database user from .env
    process.env.DB_PASSWORD,  // Database password from .env
    {
        host: process.env.DB_HOST,       // Database host from .env
        dialect: process.env.DB_DIALECT, // Database dialect (mysql, postgres, etc.) from .env
    }
);

// Test the connection to the database
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit if the connection fails
    }
};

// Export the Sequelize instance and connection test function
export { sequelize, testConnection };
