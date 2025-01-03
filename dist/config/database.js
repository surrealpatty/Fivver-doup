import 'reflect-metadata'; // Import reflect-metadata to enable decorators for Sequelize models
import { Sequelize } from 'sequelize-typescript'; // Import Sequelize from sequelize-typescript
import * as dotenv from 'dotenv'; // Import dotenv to load environment variables from the .env file
// Import models (ensure paths are correct)
import { User } from '../models/user';
import { Service } from '../models/services';
import { Order } from '../models/order';
import { Review } from '../models/review';
// Load environment variables from .env file
dotenv.config();
// Initialize Sequelize instance using environment variables
const sequelize = new Sequelize({
    dialect: 'mysql', // Specify the database dialect
    host: process.env.DB_HOST || 'localhost', // Use 'localhost' if DB_HOST is not set
    username: process.env.DB_USER || 'root', // Use 'root' if DB_USER is not set
    password: process.env.DB_PASSWORD || '', // Use an empty string if DB_PASSWORD is not set
    database: process.env.DB_NAME || 'fivver_doup', // Use 'fivver_doup' if DB_NAME is not set
    models: [User, Service, Order, Review], // Specify models
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging only in development mode
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    pool: {
        max: 10, // Max number of connections in pool
        min: 0, // Min number of connections in pool
        acquire: 30000, // Max time (in ms) to wait for a connection
        idle: 10000, // Max time (in ms) to wait for an idle connection
    },
});
// Test the database connection
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Sync the database (optional, use cautiously in production)
if (process.env.NODE_ENV !== 'production') {
    sequelize
        .sync({ alter: true }) // Alter tables to match models in non-production environments
        .then(() => {
        console.log('Database synchronized successfully.');
    })
        .catch((error) => {
        console.error('Error syncing the database:', error);
    });
}
// Export the sequelize instance
export default sequelize;
//# sourceMappingURL=database.js.map