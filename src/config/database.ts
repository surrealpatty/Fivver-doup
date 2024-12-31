// src/config/database.ts
import { Sequelize } from 'sequelize';
import config from './config'; // Ensure that your config file provides the correct DB credentials

// Initialize Sequelize with the configuration values
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  dialectOptions: {
    charset: 'utf8mb4', // Use utf8mb4 for better Unicode support
    collate: 'utf8mb4_general_ci', // Collation for MySQL to support multilingual data
  },
});

// Export sequelize instance for use in other files
export { sequelize };
