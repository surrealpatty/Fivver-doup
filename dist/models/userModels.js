"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/userModel.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // assuming sequelize is already configured
class User extends sequelize_1.Model {
}
// Initialize the model
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // You may want to enforce uniqueness for username
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // You may want to enforce uniqueness for email
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Free', // Default role for a new user
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Inactive', // Default subscription status
    },
}, {
    sequelize: database_1.sequelize, // Pass the sequelize instance
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
    timestamps: true, // Enable createdAt and updatedAt fields
});
exports.default = User;
//# sourceMappingURL=userModels.js.map