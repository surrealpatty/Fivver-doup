// src/config/database.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sequelize", {
    enumerable: true,
    get: function() {
        return sequelize;
    }
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _user = require("../models/user");
const _services = require("../models/services");
const _order = require("../models/order");
const _review = require("../models/review");
const _config = /*#__PURE__*/ _interop_require_default(require("./config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Initialize Sequelize instance with necessary configurations
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: _config.default.DB_HOST,
    username: _config.default.DB_USER,
    password: _config.default.DB_PASSWORD,
    database: _config.default.DB_NAME,
    models: [
        _user.User,
        _services.Service,
        _order.Order,
        _review.Review
    ],
    logging: _config.default.NODE_ENV === 'development' ? console.log : false,
    define: {
        freezeTableName: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.DB_USE_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false
        } : undefined
    }
});
// Test the database connection
const testConnection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
// Sync database schema in non-production environments
const syncDatabase = async ()=>{
    if (_config.default.NODE_ENV !== 'production') {
        try {
            await sequelize.sync({
                alter: true
            }); // Adjust tables to match models (use cautiously)
            console.log('Database synchronized successfully.');
        } catch (error) {
            console.error('Error synchronizing the database:', error);
        }
    }
};
// Execute database connection and sync logic
testConnection();
syncDatabase();
