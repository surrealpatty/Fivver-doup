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
    DB_PASSWORD = '',
    DB_NAME = 'fivver_doup',
    DB_PORT = '3306',
    NODE_ENV = 'development',
}: NodeJS.ProcessEnv = process.env;

// Validate critical environment variables
if (NODE_ENV !== 'test' && (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT)) {
    console.error('Missing required database environment variables. Check your .env file.');
    process.exit(1);
}

// Config object for the application
const config = {
    db: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: parseInt(DB_PORT, 10), // Ensure DB_PORT is an integer
    },
    nodeEnv: NODE_ENV,
};

// Export the configuration
export default config;
