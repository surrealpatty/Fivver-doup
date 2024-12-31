import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import * as dotenv from 'dotenv';  // Import dotenv to load environment variables from the .env file
import path from 'path';  // For handling file paths
import { User } from '../models/user';  // Import all models explicitly
import { Service } from '../models/services';
import { Order } from '../models/order';
import { Review } from '../models/review';  // Import all models to register them

// Load environment variables from .env file (ensure .env file exists in the root directory)
dotenv.config();

// Initialize Sequelize instance using environment variables
const sequelize = new Sequelize({
  dialect: 'mysql',  // Set the dialect to MySQL
  host: process.env.DB_HOST || 'localhost',  // Default to 'localhost' if no DB_HOST is provided
  username: process.env.DB_USER || 'root',  // Default to 'root' if no DB_USER is provided
  password: process.env.DB_PASSWORD || '',  // Default to empty string if no DB_PASSWORD is provided
  database: process.env.DB_NAME || 'fivver_doup',  // Default to 'fivver_doup' if no DB_NAME is provided
  models: [User, Service, Order, Review],  // Register models to Sequelize instance here
  logging: false,  // Disable SQL query logging (can be set to true in development)
  define: {
    freezeTableName: true,  // Prevent Sequelize from pluralizing table names
  },
});

// Sync the database to ensure all tables are created (optional based on your needs)
sequelize.sync({ alter: true });  // This will alter the tables to match the model structure

// Export the sequelize instance for use in models and elsewhere in the application
export { sequelize };

export default sequelize;
