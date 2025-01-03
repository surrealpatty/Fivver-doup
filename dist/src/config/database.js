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
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
const _order = /*#__PURE__*/ _interop_require_default(require("../models/order"));
const _review = require("../models/review");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Create a Sequelize instance and pass models
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup',
    models: [
        _user.default,
        _services.default,
        _order.default,
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
    },
    dialectOptions: {
        ssl: process.env.DB_USE_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false
        } : undefined
    }
});
