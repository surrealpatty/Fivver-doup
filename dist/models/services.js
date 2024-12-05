"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// Sequelize Service model class
class Service extends sequelize_1.Model {
    id;
    title;
    description;
    price;
    userId;
}
// Initialize the Service model
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize, // Reference to the Sequelize instance
    modelName: 'Service', // Name of the model in database
    timestamps: true, // Enable timestamps if you want to use createdAt and updatedAt
});
exports.default = Service; // Default export of the Service model
//# sourceMappingURL=services.js.map