"use strict";
// Load environment variables from the .env file
require('dotenv').config();
// Ensure that all required environment variables are present
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'fivver_doup', DB_PORT = '3306', NODE_ENV = 'development', JWT_SECRET = 'your-secret-key', JWT_EXPIRATION = '1h', } = process.env;
// Ensure that DB_PORT is an integer
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Configuration for different environments
module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'mysql',
        port: parsedDBPort,
    },
    test: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}_test`, // For testing, use a separate test DB
        host: DB_HOST,
        dialect: 'mysql',
        port: parsedDBPort,
    },
    production: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}_prod`, // For production, use a separate prod DB
        host: DB_HOST,
        dialect: 'mysql',
        port: parsedDBPort,
    },
};
//# sourceMappingURL=config.js.map