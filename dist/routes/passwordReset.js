"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto")); // For generating a secure token
const user_1 = require("../models/user"); // Correct import for User model
const sequelize_1 = require("sequelize"); // Add this import for Sequelize operators
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
// Create a nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // Or another service like SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or an app password
    },
});
// Request Password Reset Route
router.post('/reset-password/request', async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate a password reset token
        const resetToken = crypto_1.default.randomBytes(20).toString('hex'); // Generate a token
        const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour expiration
        // Store the token and expiration in the database
        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();
        // Send the password reset email with the reset token
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset link sent to your email.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while processing password reset request' });
    }
});
// Handle Password Reset
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        // Find user by reset token
        const user = await user_1.User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [sequelize_1.Op.gte]: new Date() }, // Check if token is expired
            },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        // Hash the new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update the user's password and clear the reset token
        user.password = hashedPassword;
        user.resetToken = null; // Cast null to string | undefined
        user.resetTokenExpiration = null; // Cast null to Date | undefined
        await user.save();
        res.status(200).json({ message: 'Password successfully reset' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while resetting password' });
    }
});
exports.default = router;
//# sourceMappingURL=passwordReset.js.map