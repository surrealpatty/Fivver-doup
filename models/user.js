const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

class User extends Model {
    static associate(models) {
        User.hasMany(models.Service, { foreignKey: 'userId', as: 'services' });
    }
}

// Initialize the User model
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
            unique: {
                args: true,
                msg: 'Username already taken',
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email address already in use!', // Custom error message
            },
            validate: {
                isEmail: {
                    msg: 'Please provide a valid email address', // Validate email format
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100], // Enforce password length
                    msg: 'Password must be at least 6 characters long',
                },
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Explicitly set the table name
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        underscored: true, // Uses snake_case in the database
    }
);

// No need to sync the model here
// Instead, manage syncing in your app.js or migration files.

module.exports = User;
