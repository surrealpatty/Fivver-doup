const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Import the sequelize instance

// Define the UserProfile model
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
const init = () => {
    UserProfile.init({}, { sequelize, modelName: 'UserProfile' });
};

// Export the init function and the UserProfile model
module.exports = { init, UserProfile }; // Use CommonJS syntax for export
