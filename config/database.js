import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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
    charset: 'utf8mb4', // Avoid cesu8 encoding issue with utf8mb4
  },
  logging: false, // Set to true to enable logging for debugging purposes
});

// Import models
import User from '../models/user.js';
import Service from '../models/services.js';

// Initialize models and set up associations
User.initModel(sequelize);
Service.initModel(sequelize);

User.associate(sequelize.models);
Service.associate(sequelize.models);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

// Sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

export { sequelize, testConnection, syncDatabase };
