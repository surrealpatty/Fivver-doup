import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Determine the current environment or default to 'development'
const env = process.env.NODE_ENV || 'development';

// Define the Sequelize instance for the current environment
const sequelize = new Sequelize({
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  dialect: 'mysql',
  logging: env === 'development',  // Enable logging only in development
});

// Export sequelize as a named export
export { sequelize };
