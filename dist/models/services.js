"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/services.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Assuming sequelize is properly initialized
class Service extends sequelize_1.Model {
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.STRING, // Change id type to string
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Using UUID for auto-generated id
    },
    userId: {
        type: sequelize_1.DataTypes.STRING, // Change userId type to string
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING, // Add image field (optional)
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
});
exports.default = Service;
