"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("@models/services")); // Ensure correct import for Service model
const user_1 = require("@models/user"); // Assuming there is a User model for user details
const authenticateToken_1 = __importDefault(require("@middlewares/authenticateToken")); // Correct path for authenticateToken
const router = express_1.default.Router();
// Profile route to get the user's info and their services
router.get('/profile', authenticateToken_1.default, async (req, res) => {
    const userId = req.user?.id; // Get user ID from the authenticated token
    if (!userId) {
        res.status(400).json({ message: 'User ID not found in token' });
        return;
    }
    try {
        // Fetch the user information and their services
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const services = await services_1.default.findAll({ where: { userId } });
        res.status(200).json({
            message: 'User profile retrieved successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email, // Include relevant user details
            },
            services, // Include user's services
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving user profile' });
    }
});
// Profile update route to allow users to update their profile information
router.put('/profile', authenticateToken_1.default, async (req, res) => {
    const userId = req.user?.id; // Get user ID from the authenticated token
    if (!userId) {
        res.status(400).json({ message: 'User ID not found in token' });
        return;
    }
    const { username, email } = req.body; // You can add other fields as needed
    try {
        // Find the user by ID and update their details
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Update user details
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        await user.save();
        res.status(200).json({
            message: 'User profile updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email, // Return updated user info
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user profile' });
    }
});
exports.default = router;
