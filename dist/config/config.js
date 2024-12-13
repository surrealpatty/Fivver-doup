"use strict";
require('dotenv').config(); // Ensure dotenv is required to load .env variables
module.exports = {
    development: {
        username: process.env.DB_USER || 'root', // Use environment variables or defaults
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306, // Make sure to include the port
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'fivver_doup_test',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'fivver_doup_prod',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    },
};
//# sourceMappingURL=config.js.map