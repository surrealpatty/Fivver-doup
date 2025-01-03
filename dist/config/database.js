import { Sequelize } from 'sequelize-typescript';
import config from './config'; // Import the configuration file
import Service from '../models/services'; // Use default import
// src/config/database.ts
import User from '../models/user'; // Remove the .ts extension
import Order from '../models/order'; // Remove the .ts extension
import { Review } from '../models/review'; // Remove the .ts extension
// Initialize Sequelize instance with the necessary configuration
const sequelize = new Sequelize({
    dialect: 'mysql', // Database dialect
    host: config.DB_HOST, // Database host
    username: config.DB_USER, // Database username from config
    password: config.DB_PASSWORD, // Database password from config
    database: config.DB_NAME, // Database name from config
    models: [User, Service, Order, Review], // Register all models here
    logging: config.NODE_ENV === 'development' ? console.log : false, // Enable logging in development
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        acquire: 30000, // Maximum time (ms) to wait for a connection
        idle: 10000, // Maximum time (ms) a connection can remain idle
    },
    dialectOptions: {
        ssl: process.env.DB_USE_SSL === 'true'
            ? { require: true, rejectUnauthorized: false }
            : undefined,
    },
});
// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
// Sync database schema in non-production environments
const syncDatabase = async () => {
    if (config.NODE_ENV !== 'production') {
        try {
            await sequelize.sync({ alter: true }); // Adjust tables to match models (use cautiously)
            console.log('Database synchronized successfully.');
        }
        catch (error) {
            console.error('Error synchronizing the database:', error);
        }
    }
};
// Execute database connection and sync logic
testConnection();
syncDatabase();
// Export the Sequelize instance for use elsewhere
export { sequelize };
