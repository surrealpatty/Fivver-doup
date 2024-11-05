import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import config from '../../config/config.js'; // Adjust the path to your config file

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// Create an object to hold the models
const models = {};

// Import the User model and initialize it
import { init as initUser } from './user.js'; // Adjusted import for user.js
const User = initUser(sequelize); // Initialize User model

models.User = User; // Add User model to models object

// Dynamically import other model files if you have any
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Ignore dotfiles
            file !== basename && // Ignore the index.js file itself
            file.slice(-3) === '.js' // Only include .js files
        );
    })
    .forEach(file => {
        // Import other models here if needed
    });

// Now that all models are initialized, set up associations if any
Object.keys(models).forEach(modelName => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
    }
});

// Export the models and the Sequelize instance
export { sequelize, models };
