import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// Destructure environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV } = process.env;

// Ensure required environment variables are set
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error('Missing required database environment variables.');
}

// Validate the provided dialect
const validDialects = ['mysql', 'postgres', 'sqlite', 'mssql'];
if (!validDialects.includes(DB_DIALECT)) {
    throw new Error(`Invalid DB_DIALECT specified: ${DB_DIALECT}. Must be one of ${validDialects.join(', ')}`);
}

// Determine SSL usage based on environment
const useSSL = DB_SSL === 'true';

// Set up Sequelize instance with dialect-specific options
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql', // Ensure the dialect is strictly typed
    logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development mode
    dialectOptions: DB_DIALECT === 'mysql' || DB_DIALECT === 'postgres'
        ? useSSL
            ? {
                ssl: {
                    rejectUnauthorized: false, // Allow self-signed certificates
                },
                charset: 'utf8mb4',
            }
            : { charset: 'utf8mb4' }
        : {}, // No dialectOptions needed for sqlite
    define: {
        freezeTableName: true, // Prevent automatic pluralization of table names
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    pool: {
        max: 5, // Maximum number of connections in pool
        min: 0, // Minimum number of connections in pool
        acquire: 30000, // Maximum time (ms) to acquire a connection
        idle: 10000, // Maximum time (ms) a connection can be idle before being released
    },
});

// Function to test database connection and sync tables
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        if (NODE_ENV !== 'test') {
            await sequelize.sync({ alter: true }); // Sync models with the database (but only for non-test environments)
            console.log('Database tables synced successfully.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        if (NODE_ENV !== 'test') {
            process.exit(1); // Exit the process if not in test mode
        }
    }
};

export { sequelize, testConnection };
