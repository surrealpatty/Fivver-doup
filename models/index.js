const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

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
        // Require the model and get both the model and init function
        const { init, model } = require(path.join(__dirname, file));

        // Store the model in the models object
        models[model.name] = model; // Using the model's name as the key

        // Call the init function with the Sequelize instance
        if (typeof init === 'function') {
            init(sequelize); // Ensure that init is called if it exists
        }
        
        // Call the associate method if it exists
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });

// Export the models and the Sequelize instance
module.exports = { sequelize, models };
