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
};

// Export the model class
export { User };
