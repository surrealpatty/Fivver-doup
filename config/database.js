const { Sequelize } = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development']; // Load the correct environment config

// Create Sequelize instance using the environment-specific config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

module.exports = sequelize;
