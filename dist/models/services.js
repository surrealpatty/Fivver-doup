"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure this is a named import if you're using named exports
// Define the Service model class
class Service extends sequelize_1.Model {
}
// Initialize the model
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Mark the 'id' as primary key
        allowNull: false, // Ensure 'id' cannot be null
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
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
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Ensure the name field is not null
    },
}, {
    sequelize: database_1.sequelize, // Make sure sequelize instance is passed here
    modelName: 'Service',
});
exports.default = Service;
