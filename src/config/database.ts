import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Destructure environment variables from process.env
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, NODE_ENV } = process.env;

// TypeScript type declaration for process.env
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
    if (NODE_ENV !== 'test') {
        console.error('Missing required environment variables. Please check your .env file.');
        process.exit(1); // Exit the process if it's not in a test environment
    }
}

// Sequelize instance for database connection
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: DB_HOST || 'localhost', // Default to 'localhost' if not provided
    username: DB_USER || 'root', // Default to 'root' if not provided
    password: DB_PASSWORD || '', // Default to empty string if not provided
    database: DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if not provided
    port: parseInt(DB_PORT || '3306', 10), // Default to 3306 if not provided
    logging: NODE_ENV === 'development', // Log SQL queries only in development
    dialectOptions: {
        timezone: 'Z', // Optional: Use UTC for MySQL queries (if applicable)
    },
    define: {
        timestamps: false, // Optional: Adjust if you don't want `createdAt` and `updatedAt` fields
    },
});

// Function to test the database connection
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        } else {
            console.error('An unknown error occurred during the database connection');
        }

        // Do not call process.exit(1) in a test environment
        if (NODE_ENV !== 'test') {
            process.exit(1); // Exit the process only if it's not a test environment
        }
    }
};

// Ensure sequelize connection is properly closed after tests or app shutdown
export const closeConnection = async () => {
    try {
        await sequelize.close();
        console.log('Database connection has been closed.');
    } catch (error) {
        console.error('Error closing the database connection:', error);
    }
};

// Only call testConnection if it's not in a test environment
if (NODE_ENV !== 'test') {
    testConnection();
}
