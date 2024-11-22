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
            JWT_SECRET: string;         // JWT_SECRET is required and should be a string
            JWT_EXPIRATION?: string;    // JWT_EXPIRATION can be optional
        }
    }
}

// Destructure and validate environment variables with defaults
const {
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = '',
    DB_NAME = 'fivver_doup',
    DB_PORT = '3306',
    NODE_ENV = 'development',
    JWT_SECRET = 'your-secret-key',     // Default value for JWT_SECRET
    JWT_EXPIRATION = '1h',             // Default value for JWT_EXPIRATION
}: NodeJS.ProcessEnv = process.env;

// Validate critical environment variables
if (NODE_ENV !== 'test' && (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)) {
    console.error('Missing required environment variables. Check your .env file.');
    process.exit(1);
}

// Config object for the application
const config = {
    db: {
        host: DB_HOST as string,               // Explicitly cast to string
        user: DB_USER as string,               // Explicitly cast to string
        password: DB_PASSWORD as string,       // Explicitly cast to string
        database: DB_NAME as string,           // Explicitly cast to string
        port: parseInt(DB_PORT, 10),           // Ensure DB_PORT is an integer
    },
    nodeEnv: NODE_ENV as string,              // Explicitly cast to string
    JWT_SECRET,                               // Use as-is since it's required and a string
    JWT_EXPIRATION,                           // Use as-is since it's already a string
};

// Export the configuration
export default config;
