"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user"); // Assuming you have the User model
const email_1 = require("../utils/email"); // Importing email utility to send password reset email
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// POST /api/users/request-password-reset - Request Password Reset Route
router.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;
    try {
        // Validate required fields
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        // Check if the user exists
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate a reset token
        const resetToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in .env
        { expiresIn: '1h' } // Token expires in 1 hour
        );
        // Generate the reset link
        const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
        // Send password reset email
        await (0, email_1.sendPasswordResetEmail)(email, resetToken);
        return res.status(200).json({
            message: 'Password reset email sent. Please check your inbox.',
        });
    }
    catch (error) {
        console.error('Error requesting password reset:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});
// POST /api/users/reset-password - Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        // Validate required fields
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }
        // Verify the reset token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || typeof decoded === 'string') {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        // Find the user associated with the token
        const user = await user_1.User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Hash the new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update the user's password
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map