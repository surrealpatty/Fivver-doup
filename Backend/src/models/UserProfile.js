// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Import the sequelize instance

// Define the UserProfile model
const UserProfile = sequelize.define('UserProfile', {
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Add other fields as necessary
}, {
    // Optional model options here, if needed
    tableName: 'user_profiles', // Optional: Specify the table name
    timestamps: true, // Optional: Add createdAt and updatedAt fields
});

// Initialize the UserProfile model
const init = async () => {
    try {
        await UserProfile.sync(); // Create the table if it doesn't exist
        console.log("UserProfile table created successfully.");
    } catch (error) {
        console.error("Error creating UserProfile table:", error);
    }
};

// Export the UserProfile model and init function
module.exports = { UserProfile, init };
