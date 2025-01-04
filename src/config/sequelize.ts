import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user'; // Ensure the path is correct
import Service from '../models/services'; // Ensure the path is correct
import Order from '../models/order'; // Ensure the Order model exists and is correctly defined
import { Review } from '../models/review'; // Ensure the Review model exists and is correctly defined

dotenv.config(); // Load environment variables from .env file

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Ensure no missing commas
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  models: [User, Service, Order, Review], // Ensure your models are correctly defined and imported
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false }
      : undefined,
  }
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('An unknown error occurred during the connection test');
    }
    // Removed process.exit(1) to prevent abrupt termination during testing
    // process.exit(1); // Removed this line to allow Jest to handle the error gracefully
  }
};

// Call the test connection function
testConnection();

// Export sequelize for use in other parts of the application
export { sequelize };
