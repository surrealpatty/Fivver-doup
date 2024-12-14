import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure that environment variables are loaded properly
const {
  DB_HOST = 'localhost',     // Default to 'localhost' if DB_HOST is not set
  DB_USER = 'root',          // Default to 'root' if DB_USER is not set
  DB_PASSWORD = '',          // Default to empty string if DB_PASSWORD is not set
  DB_NAME = 'fivver_doup',    // Default to 'fivver_doup' if DB_NAME is not set
} = process.env;

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,             // Disable query logging (set to true for debugging)
  define: {
    timestamps: true,         // Enable createdAt and updatedAt automatically
    freezeTableName: true,    // Disable pluralization of table names
  },
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
});

export { sequelize }; // Ensure sequelize is exported
