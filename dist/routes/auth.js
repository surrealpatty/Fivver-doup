"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
// Profile Management Route: Update profile
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res) => {
    const { email, username, password, newPassword } = req.body;
    try {
        // Ensure the user is authenticated and their ID is available
        const user = await user_1.User.findByPk(req.user?.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Update email or username if provided
        if (email)
            user.email = email;
        if (username)
            user.username = username;
        // Handle password update if newPassword is provided
        if (newPassword) {
            // Compare the current password with the existing hashed password
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid current password.' });
            }
            // Hash and update the new password
            user.password = await bcryptjs_1.default.hash(newPassword, 10);
        }
        // Save the updated user data
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Export the router to use in the main app
exports.default = router;
//# sourceMappingURL=auth.js.map