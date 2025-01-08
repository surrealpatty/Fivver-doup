"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    mockDatabase: function() {
        return mockDatabase;
    },
    sequelize: function() {
        return sequelize;
    }
});
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _sequelizetypescript = require("sequelize-typescript");
const _user = require("../models/user");
const _services = require("../models/services");
const _order = require("../models/order");
const _review = require("../models/review");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config(); // Load environment variables from .env file
// Extract the current environment and set defaults
const environment = process.env.NODE_ENV || 'development';
// Map environment variables for database configuration
const DB_USERNAME = environment === 'test' ? process.env.TEST_DB_USERNAME || 'test_user' : process.env.DB_USERNAME || 'root';
const DB_PASSWORD = environment === 'test' ? process.env.TEST_DB_PASSWORD || 'test_password' : process.env.DB_PASSWORD || 'password';
const DB_NAME = environment === 'test' ? process.env.TEST_DB_NAME || 'fivver_doup_test' : process.env.DB_NAME || 'fivver_doup';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USE_SSL = process.env.DB_USE_SSL === 'true';
// Configure Sequelize with options
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    models: [
        _user.User,
        _services.Service,
        _order.Order,
        _review.Review
    ],
    logging: environment === 'development' ? console.log : false,
    define: {
        freezeTableName: true,
        timestamps: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        ssl: DB_USE_SSL ? {
            require: true,
            rejectUnauthorized: false
        } // Enable SSL if required
         : undefined
    }
});
const mockDatabase = async ()=>{
    if (environment === 'test') {
        await sequelize.sync({
            force: true
        }); // Sync and reset the database for testing
        console.log('Test database synchronized successfully');
    }
};
