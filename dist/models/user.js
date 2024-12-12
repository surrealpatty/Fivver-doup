"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Import the sequelize instance
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36), // Use CHAR(36) for UUID
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Automatically generate UUID for the ID
        primaryKey: true, // Set the ID as the primary key
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
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for isVerified
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // resetToken can be null initially
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // resetTokenExpiration can be null initially
    }
}, {
    sequelize: database_1.sequelize, // The sequelize instance
    modelName: 'User', // Model name is 'User'
    tableName: 'Users', // Table name in the database
    timestamps: true, // Automatically add timestamps (createdAt, updatedAt)
    underscored: true, // Use snake_case column names
});
//# sourceMappingURL=user.js.map