// src/models/services.ts
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
    Service: function() {
        return Service;
    },
    default: function() {
        return _default;
    }
});
const _sequelize = require("sequelize");
const _database = require("../config/database");
class Service extends _sequelize.Model {
    id;
    title;
    description;
    price;
    userId;
    image;
}
Service.init({
    id: {
        type: _sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: _sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    userId: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: _database.sequelize,
    modelName: 'Service'
});
const _default = Service;

//# sourceMappingURL=services.js.map