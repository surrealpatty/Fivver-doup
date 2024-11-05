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

// Optional: Initialize the UserProfile model
const init = () => {
    // If you have any special initialization logic, you can add it here
    UserProfile.sync(); // This will create the table if it doesn't exist
};

// Export the UserProfile model and the init function
module.exports = { UserProfile, init };
