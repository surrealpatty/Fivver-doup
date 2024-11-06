import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import config from '../../config/config.js'; // Adjust the path to your config file

const basename = path.basename(import.meta.url); // Use import.meta.url to get the current file name
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

// Import and initialize the Review model
import { init as initReview } from './review.js'; 
const Review = initReview(sequelize);
models.Review = Review; // Add Review model to models object

// Import and initialize the Service model
import { init as initService } from './services.js'; 
const Service = initService(sequelize);
models.Service = Service; // Add Service model to models object

// Import and initialize the UserProfile model
import { init as initUserProfile } from './UserProfile.js'; 
const UserProfile = initUserProfile(sequelize);
models.UserProfile = UserProfile; // Add UserProfile model to models object

// Dynamically import model files from the current directory
const modelFiles = fs.readdirSync(path.dirname(new URL(import.meta.url).pathname))
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Ignore dotfiles
            file !== basename && // Ignore the index.js file itself
            file.slice(-3) === '.js' // Only include .js files
        );
    });

for (const file of modelFiles) {
    const model = await import(path.join(path.dirname(new URL(import.meta.url).pathname), file)); 
    models[model.default.name] = model.default(sequelize, Sequelize.DataTypes); // Ensure correct model initialization
}

// Now that all models are initialized, set up associations if any
Object.keys(models).forEach(modelName => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
    }
});

// Export the models and the Sequelize instance
export { sequelize, models };
