import 'reflect-metadata'; // Enable decorators for Sequelize models
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv'; // Load environment variables
// Import models (adjust paths if needed)
import { User } from '../models/user';
import { Service } from '../models/services';
import { Order } from '../models/order';
import { Review } from '../models/review';
// Load environment variables from .env file
dotenv.config();
// Initialize Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql', // Database dialect
    host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if not set
    username: process.env.DB_USER || 'root', // Default to 'root' if not set
    password: process.env.DB_PASSWORD || '', // Default to an empty string if not set
    database: process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if not set
    models: [User, Service, Order, Review], // Register models
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging in development mode
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        acquire: 30000, // Maximum time (ms) to wait for a connection
        idle: 10000, // Maximum time (ms) a connection can remain idle
    },
});
// Test database connection
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Sync database schema in non-production environments
if (process.env.NODE_ENV !== 'production') {
    sequelize
        .sync({ alter: true }) // Adjust tables to match models (use cautiously)
        .then(() => {
        console.log('Database synchronized successfully.');
    })
        .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });
}
// Export the Sequelize instance
export default sequelize;
//# sourceMappingURL=database.js.map