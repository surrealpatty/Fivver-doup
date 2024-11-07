// src/models/index.js
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Use dynamic import for config.js to ensure the correct path is resolved
const dbConfig = await import('../../config/config.js');  // Ensure async import

// Initialize Sequelize instance with the config details
const sequelize = new Sequelize(dbConfig[env].database, dbConfig[env].username, dbConfig[env].password, {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
    logging: false, // Turn off SQL query logging
});

const models = {};

const importModels = async () => {
    const files = fs.readdirSync(__dirname)
        .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');

    for (const file of files) {
        const model = await import(path.join(__dirname, file));
        const initializedModel = model.default(sequelize, Sequelize.DataTypes);
        models[initializedModel.name] = initializedModel;
    }

    Object.keys(models).forEach((modelName) => {
        if (typeof models[modelName].associate === 'function') {
            models[modelName].associate(models);
        }
    });
};

importModels().catch((err) => console.error('Failed to import models:', err));

export { sequelize, models };
