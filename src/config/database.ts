import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Extend the NodeJS.ProcessEnv interface to include custom properties
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST?: string;
            DB_USER?: string;
            DB_PASSWORD?: string;
            DB_NAME?: string;
            DB_PORT?: string;
            NODE_ENV?: string;
        }
    }
}

// Destructure and validate environment variables with defaults
const {
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = 'X^SE4Jzp$qfd1Fs2qfT*',  // Use actual password or make it configurable
    DB_NAME = 'fivver_doup',
    DB_PORT = '3306',
    NODE_ENV = 'development',
}: NodeJS.ProcessEnv = process.env;

// Validate critical environment variables (except in test environment)
if (NODE_ENV !== 'test' && (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT)) {
    console.error('Missing required database environment variables. Check your .env file.');
    process.exit(1);
}

// Initialize Sequelize instance with environment variables
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: parseInt(DB_PORT, 10), // Parse port as an integer
    logging: NODE_ENV === 'development' ? console.log : false, // Log SQL queries only in development
    dialectOptions: {
        timezone: 'Z', // Use UTC timezone for MySQL queries
    },
    define: {
        timestamps: true, // Enable timestamps by default
    },
});

// Test the database connection
export const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error(
            'Error connecting to the database:',
            error instanceof Error ? error.message : error
        );
        if (NODE_ENV !== 'test') {
            process.exit(1); // Exit the process if not in test environment
        }
    }
};

// Close the database connection
export const closeConnection = async (): Promise<void> => {
    try {
        await sequelize.close();
        console.log('Database connection closed successfully.');
    } catch (error) {
        console.error('Error closing the database connection:', error);
    }
};

// Automatically test the connection unless in a test environment
if (NODE_ENV !== 'test') {
    testConnection().catch((err) => {
        console.error('Unhandled error during initial database connection test:', err);
        if (NODE_ENV !== 'test') process.exit(1);
    });
}

// Export Sequelize instance for use in models
export default sequelize;
