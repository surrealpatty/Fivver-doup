"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserDetails = exports.getUserDetails = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user")); // Assuming User is a Sequelize model
const types_1 = require("../types"); // Import consolidated types
// Controller for registering a new user
const registerUser = async (req, res) => {
    try {
        const { email, password, username, role, tier } = req.body;
        // Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required.' });
        }
        // Default values for role and tier if not provided
        const userRole = role ?? types_1.UserRole.User; // Default to 'User' role (enum value)
        const userTier = tier ?? types_1.UserTier.Free; // Default to 'Free' tier (enum value)
        // Set the default value for isVerified
        const isVerified = false; // Assuming new users are not verified
        // Create new user in the database
        const user = await user_1.default.create({
            email,
            password,
            username,
            role: userRole,
            tier: userTier,
            isVerified,
        });
        return res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'User registration failed', error });
    }
};
exports.registerUser = registerUser;
// Controller for fetching user details by ID
const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password: _, ...userData } = user.toJSON();
        return res.status(200).json(userData);
    }
    catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching user details.',
            error: error instanceof Error ? error.message : 'Unexpected error',
        });
    }
};
exports.getUserDetails = getUserDetails;
// Controller for updating user details (e.g., username, email)
const updateUserDetails = async (req, res) => {
    const userId = req.params.id;
    const { email, username } = req.body;
    if (!email || !username) {
        return res.status(400).json({ message: 'Email and username are required.' });
    }
    try {
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.email = email;
        user.username = username;
        await user.save();
        const { password: _, ...updatedUser } = user.toJSON();
        return res.status(200).json({
            message: 'User details updated successfully',
            user: updatedUser,
        });
    }
    catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({
            message: 'Internal server error while updating user details.',
            error: error instanceof Error ? error.message : 'Unexpected error',
        });
    }
};
exports.updateUserDetails = updateUserDetails;
// Controller for deleting a user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        return res.status(200).json({
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            message: 'Internal server error while deleting user.',
            error: error instanceof Error ? error.message : 'Unexpected error',
        });
    }
};
exports.deleteUser = deleteUser;
