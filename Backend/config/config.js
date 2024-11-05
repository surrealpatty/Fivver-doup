require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    development: {
        username: process.env.DB_USER || 'root', // Default to 'root' if env var is not set
        password: process.env.DB_PASSWORD || '', // Default to empty if env var is not set
        database: process.env.DB_NAME || 'fivver_doup_db', // Default database name
        host: process.env.DB_HOST || 'localhost', // Default to 'localhost'
        dialect: process.env.DB_DIALECT || 'mysql', // Default to MySQL dialect
    },
    test: {
        username: process.env.DB_USER || 'root', // Default to 'root'
        password: process.env.DB_PASSWORD || '', // Default to empty
        database: 'fivver_doup_db_test', // Use a separate test database
        host: process.env.DB_HOST || 'localhost', // Default to 'localhost'
        dialect: process.env.DB_DIALECT || 'mysql', // Default to MySQL dialect
    },
    production: {
        username: process.env.PROD_DB_USER || 'root', // Default to 'root'
        password: process.env.PROD_DB_PASSWORD || '', // Default to empty
        database: process.env.PROD_DB_NAME || 'fivver_doup_db', // Default production database name
        host: process.env.PROD_DB_HOST || 'localhost', // Default to 'localhost'
        dialect: process.env.DB_DIALECT || 'mysql', // Default to MySQL dialect
    },
};
