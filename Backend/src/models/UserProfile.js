import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserProfile = sequelize.define('UserProfile', {
    // Define your model attributes here
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Add other fields as necessary
});

// Function to initialize the UserProfile model
const init = (sequelize) => {
    UserProfile.init({}, { sequelize, modelName: 'UserProfile' });
};

// Export the init function and the UserProfile model
export { init, UserProfile };
