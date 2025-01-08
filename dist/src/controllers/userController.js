// Import necessary modules and types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    deleteUser: function() {
        return deleteUser;
    },
    getUserDetails: function() {
        return getUserDetails;
    },
    registerUser: function() {
        return registerUser;
    },
    updateUserDetails: function() {
        return updateUserDetails;
    }
});
const _user = require("../models/user");
const registerUser = async (req, res)=>{
    try {
        const { email, password, username, role, tier } = req.body;
        // Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({
                message: 'Email, password, and username are required.'
            });
        }
        // Default values for role and tier if not provided, casting to enums
        const userRole = role || 'User'; // Default to 'User' role
        const userTier = tier || 'Free'; // Default to 'Free' tier
        // Set the default value for isVerified
        const isVerified = false; // Assuming new users are not verified
        // Create new user in the database
        const user = await _user.User.create({
            email,
            password,
            username,
            role: userRole,
            tier: userTier,
            isVerified
        });
        return res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: 'User registration failed',
            error
        });
    }
};
const getUserDetails = async (req, res)=>{
    try {
        const userId = req.params.id;
        const user = await _user.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const { password: _, ...userData } = user.toJSON();
        return res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching user details.',
            error: error instanceof Error ? error.message : 'Unexpected error'
        });
    }
};
const updateUserDetails = async (req, res)=>{
    const userId = req.params.id;
    const { email, username } = req.body;
    if (!email || !username) {
        return res.status(400).json({
            message: 'Email and username are required.'
        });
    }
    try {
        const user = await _user.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        user.email = email;
        user.username = username;
        await user.save();
        const { password: _, ...updatedUser } = user.toJSON();
        return res.status(200).json({
            message: 'User details updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({
            message: 'Internal server error while updating user details.',
            error: error instanceof Error ? error.message : 'Unexpected error'
        });
    }
};
const deleteUser = async (req, res)=>{
    const userId = req.params.id;
    try {
        const user = await _user.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        await user.destroy();
        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            message: 'Internal server error while deleting user.',
            error: error instanceof Error ? error.message : 'Unexpected error'
        });
    }
};
