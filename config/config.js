// config.js
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*',
        database: process.env.DB_NAME || 'fivver_doup_db',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        jwt: {
            secret: process.env.JWT_SECRET || 'yourDevelopmentJWTSecret', // Development JWT secret
        },
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*',
        database: process.env.DB_NAME || 'fivver_doup_db',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        jwt: {
            secret: process.env.JWT_SECRET || 'yourProductionJWTSecret', // Production JWT secret
        },
    },
};
