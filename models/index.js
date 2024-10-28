const { Sequelize } = require('sequelize');
const config = require('../config/database'); // Adjust the path if necessary

// Initialize Sequelize instance
const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        dialect: config.DB_DIALECT || 'mysql',
    }
);

// Import models
const { User, initUser } = require('./user'); 
const { Service, initService } = require('./services');

// Initialize models and store them in an object
const models = {
    User: initUser(sequelize),
    Service: initService(sequelize),
};

// Log initialized models for debugging
Object.keys(models).forEach(modelName => {
    console.log(`Model initialized: ${modelName}`, models[modelName] ? '✓' : '✗');
});

// Set up model associations
Object.keys(models).forEach(modelName => {
    if (models[modelName] && models[modelName].associate) {
        models[modelName].associate(models);
        console.log(`Associations set up for model: ${modelName}`);
    } else if (!models[modelName]) {
        console.error(`Model ${modelName} is undefined`);
    } else {
        console.warn(`No associate method found for model: ${modelName}`);
    }
});

// Optional: Sync models with the database (uncomment if you want to sync at startup)
// sequelize.sync({ alter: true })

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Export sequelize instance and models
module.exports = {
    sequelize,
    ...models,
};
