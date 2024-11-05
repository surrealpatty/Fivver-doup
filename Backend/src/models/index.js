const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Create an object to hold the models
const models = {};

// Dynamically import all model files
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Ignore dotfiles
            file !== basename && // Ignore the index.js file itself
            file.slice(-3) === '.js' // Only include .js files
        );
    })
    .forEach(file => {
        // Require the model
        const modelModule = require(path.join(__dirname, file));

        // Check if the module has the init function and exports the model class
        if (modelModule.init && typeof modelModule.init === 'function') {
            // Call the init function with the Sequelize instance
            const model = modelModule.init(sequelize);
            // Store the model in the models object using the model's name as the key
            models[model.name] = model; // Use model.name for dynamic naming
        } else {
            console.warn(`Skipping file: ${file}. Ensure it exports an init function.`);
        }
    });

// Now that all models are initialized, set up associations
Object.keys(models).forEach(modelName => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
    }
});

// Export the models and the Sequelize instance
module.exports = { sequelize, models };
