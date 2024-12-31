import { Sequelize } from 'sequelize-typescript'; // Use sequelize-typescript for TypeScript support
import * as dotenv from 'dotenv'; // dotenv to load environment variables from .env file
import path from 'path'; // For handling file paths
// Load environment variables from .env file (ensure .env file exists in the root directory)
dotenv.config();
// Initialize Sequelize instance using environment variables
export const sequelize = new Sequelize({
    dialect: 'mysql', // Set the dialect to MySQL
    host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if no DB_HOST is provided
    username: process.env.DB_USER || 'root', // Default to 'root' if no DB_USER is provided
    password: process.env.DB_PASSWORD || '', // Default to empty string if no DB_PASSWORD is provided
    database: process.env.DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if no DB_NAME is provided
    models: [path.join(__dirname, '..', 'models')], // Automatically load all models in 'src/models'
    logging: false, // Disable SQL query logging (set to true in development if you want to see the queries)
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
});
// Export the sequelize instance for use in models and elsewhere in the application
export default sequelize;
