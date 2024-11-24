// src/config/database.ts
import { Sequelize } from 'sequelize';

// Set up environment variables for flexibility (for production, development, etc.)
const dbConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' database
  logging: false, // Disable logging for production (can be turned on in development)
};

// Initialize the Sequelize instance with configuration
const sequelize = new Sequelize(dbConfig);

// Named export for sequelize instance
export { sequelize };
