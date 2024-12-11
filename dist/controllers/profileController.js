"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const user_1 = require("@models/user"); // Ensure correct import for User model
// GET /profile - Get user profile
const getProfile = async (req, res) => {
    const userId = req.user?.id; // Access user id from req.user
    if (!userId) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Find the user by their ID
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProfile = getProfile;
// PUT /profile - Update user profile
const updateProfile = async (req, res) => {
    const userId = req.user?.id; // Access user id from req.user
    if (!userId) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    const { email, username } = req.body;
    try {
        // Find the user and update their details
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update user properties
        user.email = email || user.email;
        user.username = username || user.username;
        await user.save();
        return res.status(200).json({
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
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profileController.js.map