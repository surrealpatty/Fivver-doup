// src/models/services.ts
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
const _database = require("../config/database");
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
        type: _sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: _sequelize.DataTypes.UUIDV4
    },
    userId: {
        type: _sequelize.DataTypes.STRING,
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
    sequelize: _database.sequelize,
    modelName: 'Service'
});
const _default = Service;

//# sourceMappingURL=services.js.map