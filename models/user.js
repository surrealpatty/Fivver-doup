// models/user.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database configuration

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure usernames are unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure emails are unique
        },
        // Add other user attributes as needed (e.g., profile picture, bio)
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Specify the table name in the database
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Define associations if needed
User.associate = (models) => {
    User.hasMany(models.Service, {
        foreignKey: 'userId',
        as: 'services', // Alias for the association
    });
};

module.exports = User;
