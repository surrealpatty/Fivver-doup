import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',  // Ensure to use DB_HOST from env or default to localhost
  username: process.env.DB_USER || '',  // Use DB_USER from env, fallback to empty string
  password: process.env.DB_PASSWORD || '',  // Use DB_PASSWORD from env, fallback to empty string
  database: process.env.DB_NAME || '',  // Use DB_NAME from env, fallback to empty string
  logging: false, // Optional: disables SQL query logging
});

export { sequelize };
