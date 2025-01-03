"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _sequelize = require("sequelize");
const _database = /*#__PURE__*/ _interop_require_default(require("../config/database"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class Service extends _sequelize.Model {
    id;
    userId;
    name;
    description;
    price;
    image;
}
Service.init({
    id: {
        type: _sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: _sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: _sequelize.DataTypes.STRING
    }
}, {
    sequelize: _database.default,
    modelName: 'Service'
});
const _default = Service;
