import { Sequelize } from 'sequelize-typescript';
import User from '../models/user'; // Update path if needed
import Service from '../models/services'; // Update path if needed
import Order from '../models/order'; // Ensure the Order model is correctly defined
import { Review } from '../models/review'; // Ensure the Review model is correctly defined
// Initialize Sequelize instance with environment variables or defaults
const sequelize = new Sequelize({
    username: process.env.DB_USERNAME || 'root', // Replace 'root' if a different user is used
    password: process.env.DB_PASSWORD || 'password', // Replace 'password' with your actual password
    database: process.env.DB_NAME || 'fivver_doup', // Match your database name
    host: process.env.DB_HOST || '127.0.0.1', // Default to localhost
    dialect: 'mysql', // Use MySQL dialect
    models: [User, Service, Order, Review], // Register your models here
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log queries only in development
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    pool: {
        max: 10, // Maximum number of connections
        min: 0, // Minimum number of connections
        acquire: 30000, // Maximum time (ms) to acquire a connection
        idle: 10000, // Time (ms) a connection can remain idle before release
    },
    dialectOptions: {
        ssl: process.env.DB_USE_SSL === 'true'
            ? { require: true, rejectUnauthorized: false } // Enable SSL if required
            : undefined,
    },
});
// Test the database connection
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Export the Sequelize instance
export { sequelize };
