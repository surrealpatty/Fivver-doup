const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Create an object to hold the models
const models = {};

// Dynamically import all model files
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        const modelName = Object.keys(model)[0]; // Get the model name from the exports
        models[modelName] = model[modelName]; // Add model to models object

        // Call the initialization function if it exists
        if (model[`init${modelName}`]) {
            model[`init${modelName}`](sequelize);
        }
    });

// Call associate method for each model
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Export the models and the sequelize instance
module.exports = { sequelize, models };
