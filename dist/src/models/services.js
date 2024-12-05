"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default" // Default export of the Service model
, {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _sequelize = require("sequelize");
const _database = require("config/database");
// Sequelize Service model class
class Service extends _sequelize.Model {
    id;
    title;
    description;
    price;
    userId;
}
// Initialize the Service model
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
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: _database.sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true
});
const _default = Service;

//# sourceMappingURL=services.js.map