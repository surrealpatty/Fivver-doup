"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Import the sequelize instance
// Define the User model using named export
exports.User = database_1.sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false, // Ensure the ID is not null
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Password cannot be null
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Username cannot be null
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Tier (free/paid) cannot be null
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Default role is 'user'
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for is_verified
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // resetToken can be null initially
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // resetTokenExpiration can be null initially
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false, // createdAt cannot be null
        defaultValue: sequelize_1.DataTypes.NOW, // Set default to current timestamp
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Allow NULL for updatedAt
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'), // Set default to current timestamp
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    tableName: 'Users', // Table name in the database
    underscored: true, // Use snake_case column names in the database
});
//# sourceMappingURL=user.js.map