"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// Define the User model class
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID, // UUID type
        primaryKey: true, // Primary key
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Auto-generate UUIDv4
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'free', // Default role
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'free', // Default tier
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Default to not verified
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Nullable
    },
    passwordResetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Nullable
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
});
//# sourceMappingURL=user.js.map