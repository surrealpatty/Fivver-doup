const { Sequelize } = require('sequelize');
const config = require('../config/database'); // Adjust the path if necessary

// Initialize Sequelize instance
const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        dialect: config.DB_DIALECT, // MySQL or other dialect
    }
);

// Import models
const Service = require('./services');
const User = require('./user'); // Assuming you have a user model

// Initialize models
const models = {
    Service: Service.init(sequelize, Sequelize.DataTypes),
    User: User.init(sequelize, Sequelize.DataTypes),
};

// Set up model associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Export sequelize instance and models
module.exports = {
    sequelize,
    ...models,
};
