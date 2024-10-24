const { Sequelize } = require('sequelize');
const config = require('./config'); // Adjust the path if necessary

// Set the environment (default to 'development' if NODE_ENV is not set)
const env = process.env.NODE_ENV || 'development';

// Create a new Sequelize instance using the environment-specific configuration
const sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {
        host: config[env].host,
        dialect: config[env].dialect,
    }
);

module.exports = sequelize;
