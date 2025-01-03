"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
// Parse and validate DB_PORT environment variable
var parsedDBPort = parseInt(process.env.DB_PORT || '3306', 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Sequelize configuration for different environments
var config = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Replace with your secure value
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
    },
    test: {
        username: process.env.TEST_DB_USER || 'root',
        password: process.env.TEST_DB_PASSWORD || 'test_password', // Replace with your secure test value
        database: process.env.TEST_DB_NAME || 'fivver_doup_test',
        host: process.env.TEST_DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Replace with your secure value
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
    },
};
exports.default = config;
