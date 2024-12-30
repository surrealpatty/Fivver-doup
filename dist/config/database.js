import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/user'; // Import the User model
import { Order } from '../models/order'; // Import the Order model
// Load environment variables from .env file
dotenv.config();
// Ensure that environment variables are loaded properly
const { DB_HOST = 'localhost', // Default to 'localhost' if DB_HOST is not set
DB_USER = 'root', // Default to 'root' if DB_USER is not set
DB_PASSWORD = 'X^SE4Jzp$qfd1Fs2qfT*', // Default to a specific password if DB_PASSWORD is not set
DB_NAME = 'fivver_doup', // Default to 'fivver_doup' if DB_NAME is not set
 } = process.env;
// Initialize Sequelize instance with sequelize-typescript and models
const sequelize = new Sequelize({
    dialect: 'mysql', // Database dialect (e.g., mysql, postgres, sqlite)
    host: DB_HOST, // Host for the database
    username: DB_USER, // Database username
    password: DB_PASSWORD, // Database password
    database: DB_NAME, // Database name
    models: [User, Order], // Add your models here for sequelize-typescript
    logging: false, // Disable query logging (set to true for debugging)
    define: {
        timestamps: true, // Automatically add createdAt and updatedAt fields
        freezeTableName: true, // Disable pluralization of table names
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
    },
});
export { sequelize }; // Export sequelize instance
