"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
// src/models/index.js
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// Use dynamic import for config.js to ensure the correct path is resolved
const dbConfig = await Promise.resolve().then(() => __importStar(require('../../config/config.js'))); // Ensure async import
// Initialize Sequelize instance with the config details
const sequelize = new sequelize_1.Sequelize(dbConfig[env].database, dbConfig[env].username, dbConfig[env].password, {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
    logging: false, // Turn off SQL query logging
});
exports.sequelize = sequelize;
const models = {};
exports.models = models;
const importModels = async () => {
    const files = fs_1.default.readdirSync(__dirname)
        .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');
    for (const file of files) {
        const model = await Promise.resolve(`${path_1.default.join(__dirname, file)}`).then(s => __importStar(require(s)));
        const initializedModel = model.default(sequelize, sequelize_1.Sequelize.DataTypes);
        models[initializedModel.name] = initializedModel;
    }
    Object.keys(models).forEach((modelName) => {
        if (typeof models[modelName].associate === 'function') {
            models[modelName].associate(models);
        }
    });
};
importModels().catch((err) => console.error('Failed to import models:', err));
//# sourceMappingURL=index.js.map