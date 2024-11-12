"use strict";
const { User } = require('../models/user'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.user; // Assuming the user ID is stored in the JWT payload
        // Fetch user data from the database using the user ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user's profile details (you can choose to exclude sensitive fields like password)
        const { password, ...userProfile } = user.toJSON(); // Exclude password from response
        return res.status(200).json(userProfile); // Respond with user profile
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};
// Update User Profile
exports.updateProfile = async (req, res) => {
    const { userId } = req.user; // Get the user ID from the JWT token (assumed to be in req.user)
    const { username, email, bio } = req.body; // Assuming these are the fields you're allowing to update
    // Validate the input
    if (!username && !email && !bio) {
        return res.status(400).json({ message: 'At least one field (username, email, bio) must be provided to update' });
    }
    try {
        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user's information (only update fields that are provided)
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (bio)
            user.bio = bio;
        // Save the updated user data
        await user.save();
        // Return the updated user profile (excluding sensitive information)
        const { password, ...updatedProfile } = user.toJSON(); // Exclude password
        return res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    }
    catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};
// Delete User Profile (optional)
exports.deleteProfile = async (req, res) => {
    const { userId } = req.user; // Get user ID from the token
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Delete the user
        await user.destroy();
        // Respond with a success message
        return res.status(200).json({ message: 'Profile deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting profile:', error);
        return res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
};
//# sourceMappingURL=profileController.js.map