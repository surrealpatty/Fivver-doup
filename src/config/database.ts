// src/config/database.ts

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure that environment variables are loaded properly
const {
  DB_HOST = 'localhost',      // Default to 'localhost' if DB_HOST is not set
  DB_USER = 'root',           // Default to 'root' if DB_USER is not set
  DB_PASSWORD = '',           // Default to empty string if DB_PASSWORD is not set
  DB_NAME = 'fivver_doup',    // Default to 'fivver_doup' if DB_NAME is not set
} = process.env;

// Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',           // Database dialect (e.g., mysql, postgres, sqlite)
  logging: false,             // Disable query logging (set to true for debugging)
  define: {
    timestamps: true,         // Automatically add createdAt and updatedAt fields
    freezeTableName: true,    // Disable pluralization of table names
  },
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
});

export { sequelize }; // Ensure sequelize is exported
