import { DataTypes } from 'sequelize';

let User; // Declare the variable to hold the model

export const init = (sequelize) => {
    User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
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
    });
    return User; // Return the model instance
};

// This function returns the User model
export const getUserModel = () => User;
