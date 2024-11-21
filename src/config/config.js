const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fivver_doup',
  dialectOptions: {
    charset: 'utf8mb4', // Ensure utf8mb4 encoding to avoid 'cesu8' issue
  },
  logging: false, // Set to true to enable logging for debugging purposes
  define: {
    charset: 'utf8mb4', // Ensure tables use utf8mb4 encoding by default
    collate: 'utf8mb4_unicode_ci', // Use utf8mb4_unicode_ci collation by default
  },
});

// Import models (Ensure correct path for models)
const User = require('../models/user');
const Service = require('../models/services');

// Initialize models and set up associations
User.initModel(sequelize);
Service.initModel(sequelize);

// Set up associations between models
User.associate(sequelize.models);
Service.associate(sequelize.models);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit the process if sync fails
  }
};

module.exports = { sequelize, testConnection, syncDatabase };
