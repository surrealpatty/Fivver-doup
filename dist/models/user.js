"use strict";
// src/models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Make sure this is the correct path to your sequelize instance
// Define the User model
class User extends Model {
}
User.init({
    // Define your model attributes here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscriptionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, // Passing the sequelize instance to associate with the model
    modelName: 'User',
    tableName: 'users', // Optional: Specify table name if it's different from the default (pluralized model name)
    timestamps: true, // Enable automatic createdAt and updatedAt timestamps
});
module.exports = User; // Export the User model
//# sourceMappingURL=user.js.map