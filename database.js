// fivverdoup/database.js
const { Sequelize } = require('sequelize');
const config = require('./config/database'); // This points to the config file

// Get the current environment (development/test/production)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env]; // Get the config for the current environment

// Create a new Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the test function
testConnection();

// Export the Sequelize instance
module.exports = { sequelize };
