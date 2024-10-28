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

// Log initialized models for debugging
Object.keys(models).forEach(modelName => {
    console.log(`Model initialized: ${modelName}`, models[modelName] ? '✓' : '✗');
});

// Set up model associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
        console.log(`Associations set up for model: ${modelName}`);
    } else {
        console.warn(`No associate method found for model: ${modelName}`);
    }
});

// Optional: Sync models with the database (uncomment if you want to sync at startup)
// sequelize.sync({ alter: true }) // Use 'force: true' with caution, as it drops tables!

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Export sequelize instance and models
module.exports = {
    sequelize,
    User: models.User,     // Explicitly export the User model
    Service: models.Service, // Explicitly export the Service model
};
