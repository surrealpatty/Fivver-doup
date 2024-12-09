"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Import Sequelize types
const database_1 = require("../config/database"); // Import the initialized Sequelize instance
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
        allowNull: false, // 'userId' cannot be null
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // 'title' cannot be null
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // 'description' cannot be null
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false, // 'price' cannot be null
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // 'name' cannot be null
    },
}, {
    sequelize: database_1.sequelize, // Pass the Sequelize instance
    modelName: 'Service',
    tableName: 'services', // Ensure the table name matches
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
});
exports.default = Service;
