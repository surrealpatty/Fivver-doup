import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Database configuration from environment variables
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fivver_doup',
  logging: false,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
});

export { sequelize }; // Ensure sequelize is exported
