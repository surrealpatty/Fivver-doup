"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model with Sequelize
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: (0, uuid_1.v4)(), // Generate a new UUID for each user
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure emails are unique
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Make username required
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Make password required
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'user', // Default to 'user' role
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'free', // Default to 'free' tier
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false, // Default to false
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING, // Allow for a reset token (if needed)
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE, // Allow for a reset token expiration date
    },
}, {
    sequelize: database_1.sequelize, // The Sequelize instance
    tableName: 'users', // Table name in the database
});
//# sourceMappingURL=user.js.map