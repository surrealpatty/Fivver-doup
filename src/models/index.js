import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import dbConfig from '../../config/config.js'; // Import the config.js based on your setup

const sequelize = new Sequelize(dbConfig[env].database, dbConfig[env].username, dbConfig[env].password, {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
    logging: false, // Turn off SQL query logging
});

// Create an object to hold models
const models = {};

// Dynamically import all models in the directory
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') // Filter out non-JS files
    .forEach((file) => {
        import(path.join(__dirname, file))
            .then((module) => {
                const initializedModel = module.default(sequelize, Sequelize.DataTypes); // Use default export if available
                models[initializedModel.name] = initializedModel; // Add model to models object
            })
            .catch((err) => console.error(`Failed to import model: ${file}`, err)); // Handle import errors
    });

// Set up associations (Ensure models have associate method)
Object.keys(models).forEach((modelName) => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models); // Call associate function if exists
    }
});

export { sequelize, models }; // Export sequelize instance and models object
