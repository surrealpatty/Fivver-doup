const { Sequelize } = require('sequelize');
const config = require('./config'); // Adjust the path if necessary

// Set the environment (default to 'development' if NODE_ENV is not set)
const env = process.env.NODE_ENV || 'development';

// Create a new Sequelize instance using the environment-specific configuration
const sequelize = new Sequelize(
    config[env].db.database,   // Adjusted to use 'db' for config structure
    config[env].db.username,   // Adjusted to use 'db' for config structure
    config[env].db.password,   // Adjusted to use 'db' for config structure
    {
        host: config[env].db.host,         // Adjusted to use 'db' for config structure
        dialect: config[env].db.dialect,  // Adjusted to use 'db' for config structure
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
