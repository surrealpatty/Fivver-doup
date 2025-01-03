import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import User from '../models/user';  // Import User model
import Service from '../models/services';  // Import Service model
import Order from '../models/order';  // Import Order model (ensure this is correctly defined)
import { Review } from '../models/review';  // Import Review model (ensure this is correctly defined)

interface DatabaseConfig extends SequelizeOptions {  // Extend SequelizeOptions directly
  models: any[];
  logging: boolean | ((sql: string, timing?: number) => void);  // Correct logging type
  define: {
    freezeTableName: boolean;
  };
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  dialectOptions?: {
    ssl?: object;
  };
}

// Define the configuration object for Sequelize
const config: DatabaseConfig = {
  username: 'root',  // Your DB username
  password: 'password',  // Your DB password (ensure it matches the password in MySQL)
  database: 'fivver_doup',  // Your DB name
  host: 'localhost',  // Your DB host
  dialect: 'mysql',  // MySQL dialect as a string
  models: [User, Service, Order, Review],  // Register models
  logging: process.env.NODE_ENV === 'development' ? console.log : false,  // Log SQL queries in development
  define: {
    freezeTableName: true,  // Prevent pluralization of table names
  },
  pool: {
    max: 10,  // Max number of database connections
    min: 0,   // Min number of database connections
    acquire: 30000,  // Max time (ms) to wait for a connection
    idle: 10000,     // Max time (ms) a connection can be idle
  },
  dialectOptions: {
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false }
      : undefined,
  },
};

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(config);

// Export the sequelize instance for use elsewhere in the app
export { sequelize };
