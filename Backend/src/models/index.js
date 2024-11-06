import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../../config/config.js')[env]; // Assuming config.js contains your DB setup

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
});

// Create an object to hold models
const models = {};

// Dynamically import all models in the directory
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        models[model.name] = model; // Add model to models object
    });

// Set up associations
Object.keys(models).forEach((modelName) => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);  // Call associate function if exists
    }
});

export { sequelize, models }; // Export sequelize and models object
