import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import dbConfig from '../../config/config.js'; // Import the config.js based on your setup

// Initialize Sequelize instance with the config details
const sequelize = new Sequelize(dbConfig[env].database, dbConfig[env].username, dbConfig[env].password, {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
    logging: false, // Turn off SQL query logging
});

// Create an object to hold models
const models = {};

// Dynamically import all models in the directory
const importModels = async () => {
    const files = fs.readdirSync(__dirname)
        .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'); // Filter out non-JS files

    for (const file of files) {
        const model = await import(path.join(__dirname, file));
        const initializedModel = model.default(sequelize, Sequelize.DataTypes); // Assuming default export is used for model
        models[initializedModel.name] = initializedModel; // Add model to models object
    }

    // Set up associations after all models are imported
    Object.keys(models).forEach((modelName) => {
        if (typeof models[modelName].associate === 'function') {
            models[modelName].associate(models); // Call associate method if it exists
        }
    });
};

// Call the function to import models
importModels().catch((err) => console.error('Failed to import models:', err));

export { sequelize, models }; // Export sequelize instance and models object
