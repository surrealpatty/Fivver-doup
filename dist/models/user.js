"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class User extends sequelize_1.Model {
    static associate(models) {
        // Define associations if any
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: uuid_1.v4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true, // Ensures email is unique
        allowNull: false,
        validate: {
            isEmail: true, // Validates the email format
        },
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true, // Ensures username is unique
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
        defaultValue: false, // Default to false if not specified
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Can be null if not in use
    },
    passwordResetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Can be null if not in use
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users', // Ensure this matches your table name
    timestamps: true, // Automatically adds createdAt and updatedAt
    indexes: [
    // Only necessary indexes should be added manually, but we already have unique on email and username
    ],
});
exports.default = User;
//# sourceMappingURL=user.js.map