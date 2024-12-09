"use strict";
// src/models/services.ts
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("@config/database"); // Ensure correct import of the sequelize instance
class Service extends sequelize_1.Model {
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment ID
        allowNull: false, // ID cannot be null
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false, // userId cannot be null
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // title cannot be null
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // description cannot be null
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false, // price cannot be null
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // name cannot be null
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING, // Optional string field for image URL
        allowNull: true, // Image URL is optional
    },
}, {
    sequelize: database_1.sequelize, // Pass the sequelize instance
    modelName: 'Service', // Model name
    tableName: 'services', // Ensure the table name matches
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
});
exports.default = Service;
