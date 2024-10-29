const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize'); // Destructure Sequelize from the module

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
        // Require the model and initialize it with Sequelize
        const { init, model } = require(path.join(__dirname, file)); // Destructure the exported init function and model

        // Initialize the model with Sequelize
        init(sequelize); // Call the init function with the Sequelize instance

        // Use the model's name
        const modelName = model.name; // Use the name defined in the model class

        // Store the model in the models object
        models[modelName] = model;

        // Call the associate method if it exists
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });

// Export the models and the Sequelize instance
module.exports = { sequelize, models };
