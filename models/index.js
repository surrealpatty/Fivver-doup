const { Sequelize } = require('sequelize');
const config = require('../config/database'); // Adjust the path if necessary

// Initialize Sequelize instance
const sequelize = new Sequelize(
    config.DB_NAME, // Ensure this exists in your config
    config.DB_USERNAME, // Ensure this exists in your config
    config.DB_PASSWORD, // Ensure this exists in your config
    {
        host: config.DB_HOST, // Ensure this exists in your config
        dialect: config.DB_DIALECT || 'mysql', // Default to MySQL if not specified
    }
);

// Import models
const { User, initUser } = require('./user'); // Import the User model and init function
const { Service, initService } = require('./services'); // Import the Service model and init function

// Initialize models
const models = {
    User: initUser(sequelize), // Pass the sequelize instance to initialize the User model
    Service: initService(sequelize), // Pass the sequelize instance to initialize the Service model
};

// Set up model associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Optional: Sync models with the database (uncomment if you want to sync at startup)
// sequelize.sync({ alter: true }) // Use 'force: true' with caution, as it drops tables!

// Export sequelize instance and models
module.exports = {
    sequelize,
    ...models,
};
