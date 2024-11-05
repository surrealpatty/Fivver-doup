import { DataTypes } from 'sequelize';

let User; // Declare the variable to hold the model

export const init = (sequelize) => {
    User = sequelize.define('User', {
        // Define your model attributes here
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
    }, {
        // Additional model options can go here
    });
    return User; // Return the model instance
};

// Export the model after the init function has been called
export const getUserModel = () => User; // This function returns the User model
