// src/config/database.ts
import { sequelize } from '../config/database'; // Use named import instead of default import
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error('Missing required database environment variables');
}

const useSSL = DB_SSL === 'true';

const validDialects = ['mysql', 'postgres', 'sqlite', 'mssql'];
if (!validDialects.includes(DB_DIALECT)) {
    throw new Error('Invalid DB_DIALECT specified in environment variables');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql',
    logging: NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
        ssl: useSSL ? { rejectUnauthorized: false } : false,
        charset: 'utf8mb4',
    },
    define: {
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    pool: {
        acquire: 30000,
        idle: 10000,
    },
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        if (NODE_ENV !== 'test') {
            await sequelize.sync({ alter: true });
            console.log('Database tables synced.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        if (NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

// Export sequelize and testConnection
export { sequelize, testConnection };
