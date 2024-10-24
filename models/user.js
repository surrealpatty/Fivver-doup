// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure username is unique
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure email is unique
            validate: {
                isEmail: true, // Validate that the input is a valid email
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // Ensure password is required
        },
    },
    {
        sequelize, // Pass the connection instance
        modelName: 'User', // Model name
        tableName: 'users', // Table name in the database
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

module.exports = User; // Export the User model
