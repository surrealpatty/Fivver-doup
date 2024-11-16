import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'; // Corrected import statement

// Load environment variables from .env file
dotenv.config();

// Destructure required database config from environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV } = process.env;

// Validate essential environment variables
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error('Missing required database environment variables');
}

// Convert DB_SSL to boolean if it's set to 'true'
const useSSL = DB_SSL === 'true';

// Ensure that the dialect is valid and is a recognized database type
const validDialects = ['mysql', 'postgres', 'sqlite', 'mssql'];
if (!validDialects.includes(DB_DIALECT)) {
    throw new Error('Invalid DB_DIALECT specified in environment variables');
}

// Initialize Sequelize with appropriate config options
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql', // Ensure dialect is typed
    logging: NODE_ENV === 'development' ? console.log : false, // Log queries in development only
    dialectOptions: {
        ssl: useSSL ? { rejectUnauthorized: false } : false, // Use SSL only if DB_SSL is true
        charset: 'utf8mb4', // Charset to avoid encoding issues
    },
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    pool: {
        acquire: 30000, // Maximum time (in ms) that a connection can be idle before being released
        idle: 10000, // Maximum time (in ms) that a connection can be idle before it is released
    },
});

// Export sequelize instance
export { sequelize };

// Test the database connection and sync models
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        if (NODE_ENV !== 'test') {
            // Sync models, alter existing tables if necessary
            await sequelize.sync({ alter: true });
            console.log('Database tables synced.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
        // Exit the process if not in a test environment
        if (NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

// Test connection and sync if not running tests
if (NODE_ENV !== 'test') {
    testConnection();
}
