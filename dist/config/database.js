// dist/config/database.js

const { Sequelize } = require('sequelize'); // CommonJS import
const dotenv = require('dotenv'); // CommonJS import

dotenv.config(); // Load environment variables from .env

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // Make sure the dialect is correctly set in .env
  }
);

module.exports = { sequelize }; // Export the sequelize instance
