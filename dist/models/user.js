"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure the sequelize instance is imported
// Define the User model
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model with the correct types
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free', // Default tier is 'free'
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for isVerified is false
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null values for resetToken
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true, // Allow null values for resetTokenExpiration
    },
}, {
    sequelize: database_1.sequelize, // Use the sequelize instance
    modelName: 'User',
    tableName: 'users',
});
//# sourceMappingURL=user.js.map