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
        // Require the model and initialize it with Sequelize
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

        // Use the model's name if available, otherwise use the filename
        const modelName = model.name || file.slice(0, -3); // Use the filename without the extension

        // Store the model in the models object
        models[modelName] = model;

        // Call the associate method if it exists
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });

// Export the models and the Sequelize instance
module.exports = { sequelize, models };
