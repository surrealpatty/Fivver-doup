import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import User from '../models/user';  // Import User model
import Service from '../models/services';  // Import Service model
import Order from '../models/order';  // Import Order model (ensure this is correctly defined)
import { Review } from '../models/review';  // Import Review model (ensure this is correctly defined)

interface DatabaseConfig extends SequelizeOptions {  // Extend SequelizeOptions directly
  models: any[];  // Models array should be of type 'any[]'
  logging: boolean | ((sql: string, timing?: number) => void);  // Correct logging type
  define: {
    freezeTableName: boolean;  // Prevent Sequelize from pluralizing table names
  };
  pool: {
    max: number;  // Max number of connections
    min: number;  // Min number of connections
    acquire: number;  // Max wait time for a connection
    idle: number;  // Max idle time for a connection
  };
  dialectOptions?: {
    ssl?: object;  // Optional SSL configurations
  };
}

// Define the configuration object for Sequelize
const config: DatabaseConfig = {
  username: 'root',  // Your DB username (ensure this is correct)
  password: 'password',  // Your DB password (ensure this matches the password in MySQL)
  database: 'fivver_doup',  // Your DB name
  host: 'localhost',  // Your DB host
  dialect: 'mysql',  // MySQL dialect
  models: [User, Service, Order, Review],  // Register models
  logging: process.env.NODE_ENV === 'development' ? console.log : false,  // Log SQL queries in development environment
  define: {
    freezeTableName: true,  // Prevent pluralization of table names
  },
  pool: {
    max: 10,  // Max number of database connections
    min: 0,   // Min number of database connections
    acquire: 30000,  // Max time to wait for a connection (ms)
    idle: 10000,     // Max time a connection can be idle (ms)
  },
  dialectOptions: {
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false }
      : undefined,  // Use SSL if configured in environment variables
  },
};

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(config);

// Export the sequelize instance for use elsewhere in the app
export { sequelize };
