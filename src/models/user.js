import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Import sequelize instance

class User extends Model {}

// Initialize the User model
User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Ensure the username is unique
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Username must be between 3 and 50 characters long',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Ensure the email is unique
            validate: {
                isEmail: {
                    msg: 'Please provide a valid email address',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100],  // Enforce a minimum password length
                    msg: 'Password must be between 6 and 100 characters long',
                },
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,           // Ensure the sequelize instance is passed here
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
);

export default User;  // Export the model directly
