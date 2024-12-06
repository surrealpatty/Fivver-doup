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
// Define the Service model class
class Service extends _sequelize.Model {
    id;
    userId;
    title;
    description;
    price;
    name;
}
// Initialize the model
Service.init({
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    title: {
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
    name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: _database.sequelize,
    modelName: 'Service'
});
const _default = Service;

//# sourceMappingURL=services.js.map