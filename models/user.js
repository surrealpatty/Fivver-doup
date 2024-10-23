const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Directly import the sequelize instance

class User extends Model {}

User.init({
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
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize, // Pass the sequelize instance correctly
    modelName: 'User',
});

module.exports = User;
