"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the sequelize instance
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _dotenv = /*#__PURE__*/ _interop_require_wildcard(require("dotenv"));
const _user = require("../models/user");
const _services = require("../models/services");
const _order = require("../models/order");
const _review = require("../models/review");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// Load environment variables from .env file
_dotenv.config();
// Initialize Sequelize instance using environment variables
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    models: [
        _user.User,
        _services.Service,
        _order.Order,
        _review.Review
    ],
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
        freezeTableName: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
// Test the database connection
sequelize.authenticate().then(()=>{
    console.log('Database connection has been established successfully.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
});
// Sync the database (optional, use cautiously in production)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({
        alter: true
    }) // Alter tables to match models in non-production environments
    .then(()=>{
        console.log('Database synchronized successfully.');
    }).catch((error)=>{
        console.error('Error syncing the database:', error);
    });
}
const _default = sequelize;
