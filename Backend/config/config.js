import { config } from 'dotenv'; // Import the dotenv package
config(); // Load environment variables from .env file

export default {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'fivver_doup_db',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'fivver_doup_db_test',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    production: {
        username: process.env.PROD_DB_USER || 'root',
        password: process.env.PROD_DB_PASSWORD || '',
        database: process.env.PROD_DB_NAME || 'fivver_doup_db',
        host: process.env.PROD_DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
    },
};
