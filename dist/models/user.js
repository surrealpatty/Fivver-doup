"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/user.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Adjust the path as needed
// User model class
class User extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.passwordResetToken = null; // Default to null
        this.passwordResetTokenExpiry = null; // Default to null
    }
}
exports.User = User;
// Initialize the Sequelize User model
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
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
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Can be null initially
    },
    passwordResetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Can be null initially
    },
}, {
    sequelize: database_1.sequelize, // Pass the sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Adjust this based on your table schema
});
//# sourceMappingURL=user.js.map