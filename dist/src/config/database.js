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
const _sequelize = require("sequelize");
const _config = /*#__PURE__*/ _interop_require_default(require("./config"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Initialize Sequelize with the configuration values
const sequelize = new _sequelize.Sequelize({
    dialect: 'mysql',
    host: _config.default.DB_HOST,
    username: _config.default.DB_USER,
    password: _config.default.DB_PASSWORD,
    database: _config.default.DB_NAME,
    port: _config.default.DB_PORT,
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
});
// Manually add models to sequelize instance (if necessary)
sequelize.models.User = _user.default; // You can directly associate models like this

//# sourceMappingURL=database.js.map