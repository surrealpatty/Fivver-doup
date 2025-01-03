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
const _config = /*#__PURE__*/ _interop_require_default(require("./config"));
const _user = require("../models/user");
const _services = require("../models/services");
const _order = require("../models/order");
const _review = require("../models/review");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Initialize Sequelize instance with the necessary configuration
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
// Define associations AFTER models are added to Sequelize instance
_services.Service.belongsTo(_user.User, {
    foreignKey: 'userId'
}); // Service belongs to User
_user.User.hasMany(_services.Service, {
    foreignKey: 'userId'
}); // User can have many Services
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
            // Use `sync` cautiously, can be changed to `force: true` for table re-creation
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
