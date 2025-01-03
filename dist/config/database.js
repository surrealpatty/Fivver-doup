import { Sequelize } from 'sequelize-typescript';
import User from '../models/user'; // Import User model
import Service from '../models/services'; // Import Service model
import Order from '../models/order'; // Import Order model (ensure this is correctly defined)
import { Review } from '../models/review'; // Import Review model (ensure this is correctly defined)
// Create a Sequelize instance and pass models
const sequelize = new Sequelize({
    dialect: 'mysql', // MySQL dialect
    host: 'localhost', // Your DB host
    username: 'root', // Your DB username
    password: 'password', // Your DB password
    database: 'fivver_doup', // Your DB name
    models: [User, Service, Order, Review], // Register models
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log SQL queries in development
    define: {
        freezeTableName: true, // Prevent pluralization of table names
    },
    pool: {
        max: 10, // Max number of database connections
        min: 0, // Min number of database connections
        acquire: 30000, // Max time (ms) to wait for a connection
        idle: 10000, // Max time (ms) a connection can be idle
    },
    dialectOptions: {
        ssl: process.env.DB_USE_SSL === 'true'
            ? { require: true, rejectUnauthorized: false }
            : undefined,
    },
});
// Export the sequelize instance for use elsewhere in the app
export { sequelize };
