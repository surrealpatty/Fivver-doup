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

// Import and initialize the User model
import { init as initUser } from './user.js'; 
const User = initUser(sequelize); 
models.User = User; // Add User model to models object

// Import and initialize other models
import { init as initReview } from './review.js'; 
const Review = initReview(sequelize); 
models.Review = Review; // Add Review model to models object

import { init as initService } from './services.js'; 
const Service = initService(sequelize); 
models.Service = Service; // Add Service model to models object

import { init as initUserProfile } from './UserProfile.js'; 
const UserProfile = initUserProfile(sequelize); 
models.UserProfile = UserProfile; // Add UserProfile model to models object

// Dynamically import model files from the current directory
fs.readdirSync(path.dirname(import.meta.url))
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Ignore dotfiles
            file !== basename && // Ignore the index.js file itself
            file.slice(-3) === '.js' // Only include .js files
        );
    })
    .forEach(file => {
        // Import other models here if needed
        const model = require(path.join(path.dirname(import.meta.url), file))(sequelize, Sequelize.DataTypes);
        models[model.name] = model; // Add each model to the models object
    });

// Now that all models are initialized, set up associations if any
Object.keys(models).forEach(modelName => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
    }
});

// Export the models and the Sequelize instance
export { sequelize, models };
