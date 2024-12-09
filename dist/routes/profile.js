"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("@models/user"); // Ensure this import is correct
const authenticateToken_1 = __importDefault(require("@middlewares/authenticateToken")); // Use the authenticateToken middleware
const router = (0, express_1.Router)();
// Get user profile route
router.get('/profile', authenticateToken_1.default, async (req, res, next) => {
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the user by their ID
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update user profile route
router.put('/profile', authenticateToken_1.default, async (req, res, next) => {
    const userId = req.user?.id; // Extract user id from the token
    const { email, username } = req.body;
    try {
        // Find the user and update their details
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.email = email || user.email;
        user.username = username || user.username;
        await user.save();
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                tier: user.tier,
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
