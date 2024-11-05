import { DataTypes } from 'sequelize';

export const init = (sequelize) => {
    const User = sequelize.define('User', {
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
    return User; // Ensure you return the model instance
};

// If you want to export the model directly, you can use:
export { User };
