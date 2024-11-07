import { Sequelize } from 'sequelize';
import config from './config.js'; // Adjust path if needed

// Determine the current environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize with the configuration for the current environment
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Optional: Disable logging for cleaner output
});

// Export the Sequelize instance as the default export
export default sequelize;
