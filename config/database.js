// config/database.js
const { Sequelize } = require('sequelize');

// Configuration object containing database settings for different environments
const config = {
    development: {
        db: {
            database: process.env.DB_NAME,    // Database name from environment variable
            username: process.env.DB_USER,    // Database username from environment variable
            password: process.env.DB_PASSWORD, // Database password from environment variable
            host: process.env.DB_HOST,         // Database host from environment variable
            dialect: 'mysql',                   // Database dialect (MySQL)
        }
    },
    production: {
        db: {
            database: process.env.DB_NAME,    // Production DB name
            username: process.env.DB_USER,    // Production DB user
            password: process.env.DB_PASSWORD, // Production DB password
            host: process.env.DB_HOST,         // Production DB host
            dialect: 'mysql',                   // Production DB dialect
        }
    }
};

// Set the environment (default to 'development' if NODE_ENV is not set)
const env = process.env.NODE_ENV || 'development';

// Create a new Sequelize instance using the environment-specific configuration
const sequelize = new Sequelize(
    config[env].db.database,
    config[env].db.username,
    config[env].db.password,
    {
        host: config[env].db.host,
        dialect: config[env].db.dialect,
    }
);

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
