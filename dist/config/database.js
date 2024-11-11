"use strict";
const { Sequelize } = require('sequelize');
// Load environment variables from a `.env` file for sensitive data
require('dotenv').config();
// Select the appropriate configuration based on the NODE_ENV environment variable
const config = {
    development: {
        username: process.env.DB_USERNAME || 'your_dev_username',
        password: process.env.DB_PASSWORD || 'your_dev_password',
        database: process.env.DB_NAME || 'your_dev_database_name',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        logging: false,
    },
    production: {
        username: process.env.DB_USERNAME || 'your_prod_username',
        password: process.env.DB_PASSWORD || 'your_prod_password',
        database: process.env.DB_NAME || 'your_prod_database_name',
        host: process.env.DB_HOST || 'your_production_host',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        logging: false,
    },
};
// Determine the current environment
const env = process.env.NODE_ENV || 'development';
// Set up Sequelize instance with the environment-specific configuration
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    dialect: config[env].dialect,
    dialectOptions: config[env].dialectOptions,
    logging: config[env].logging,
});
module.exports = { sequelize, config };
//# sourceMappingURL=database.js.map