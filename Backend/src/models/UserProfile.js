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

// You can initialize the model with any additional settings if necessary
// This function is optional unless you have specific init logic
const init = () => {
    // If you have any special initialization logic, you can add it here
};

// Export the init function and the UserProfile model
module.exports = { init, UserProfile };
