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
const _sequelizetypescript = require("sequelize-typescript");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
const _order = /*#__PURE__*/ _interop_require_default(require("../models/order"));
const _review = require("../models/review");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config(); // Load environment variables from .env file
const sequelize = new _sequelizetypescript.Sequelize({
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    models: [
        _user.default,
        _services.default,
        _order.default,
        _review.Review
    ],
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
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
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        } else {
            console.error('An unknown error occurred during the connection test');
        }
    // Removed process.exit(1) to prevent abrupt termination during testing
    // process.exit(1); // Removed this line to allow Jest to handle the error gracefully
    }
};
// Call the test connection function
testConnection();
