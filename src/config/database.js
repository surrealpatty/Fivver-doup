import { Sequelize } from 'sequelize';
import * as config from './config.js';  // Make sure config.js exports environments properly

// Determine the current environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];  // Load the appropriate config based on environment

// Initialize Sequelize with the configuration for the current environment
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Optional: Disable logging for cleaner output
});

// Export the Sequelize instance as the default export
export default sequelize;
