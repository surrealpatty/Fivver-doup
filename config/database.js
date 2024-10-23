const { Sequelize } = require('sequelize');
const config = require('./config/config'); // Adjusted to use the correct path

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment]; // Load the correct environment config

// Create Sequelize instance using the environment-specific config
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
