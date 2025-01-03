import 'reflect-metadata'; // Import reflect-metadata to enable decorators for Sequelize models
import { Sequelize } from 'sequelize-typescript'; // Import Sequelize from sequelize-typescript
import * as dotenv from 'dotenv'; // Import dotenv to load environment variables from the .env file
// Import models directly (ensure paths are correct)
import { User } from '../models/user'; // Import User model
import { Service } from '../models/services'; // Import Service model
import { Order } from '../models/order'; // Import Order model
import { Review } from '../models/review'; // Import Review model
// Load environment variables from .env file (ensure .env file exists in the root directory)
dotenv.config();
// Initialize Sequelize instance using environment variables
const sequelize = new Sequelize({
    dialect: 'mysql', // Set the dialect to MySQL
    host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if no DB_HOST is provided
    username: process.env.DB_USER || 'root', // Default to 'root' if no DB_USER is provided
    password: process.env.DB_PASSWORD || '', // Default to empty string if no DB_PASSWORD is provided
    database: process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if no DB_NAME is provided
    models: [User, Service, Order, Review], // Directly specify models
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging in development mode
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
});
// Sync the database to ensure all tables are created (optional based on your needs)
// Use `{ alter: true }` to ensure the tables are altered to match the model structure
sequelize.sync({ alter: true }).catch((error) => console.error('Error syncing the database:', error));
// Export sequelize as a default export
export default sequelize;
//# sourceMappingURL=database.js.map