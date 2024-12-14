"use strict";
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path if needed
// Define the User model
class User extends Model {
}
// Initialize the Sequelize User model
User.init({
    id: {
        type: DataTypes.STRING, // id as a string (e.g., UUID)
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true, // Ensures that the email column is unique
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true, // Ensures that the username column is unique
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null initially
    },
    passwordResetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true, // Can be null initially
    },
}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users', // Name of the table in the database
    timestamps: true, // Adjust based on your table schema (if using createdAt, updatedAt)
});
module.exports = User;
//# sourceMappingURL=user.js.map