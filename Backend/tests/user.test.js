import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the User model
export const User = sequelize.define('User', {
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
    }
});

// Ensure initialization is correct
export const initUser = async () => {
    await User.sync({ force: true }); // Sync the model to reset the table before tests
};

export default User;
