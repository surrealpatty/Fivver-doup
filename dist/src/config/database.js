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
const _user = require("../models/user");
const _order = require("../models/order");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Ensure that environment variables are loaded properly
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = 'X^SE4Jzp$qfd1Fs2qfT*', DB_NAME = 'fivver_doup' } = process.env;
// Initialize Sequelize instance with sequelize-typescript and models
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    models: [
        _user.User,
        _order.Order
    ],
    logging: false,
    define: {
        timestamps: true,
        freezeTableName: true
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true
    }
});
 // Export sequelize instance

//# sourceMappingURL=database.js.map