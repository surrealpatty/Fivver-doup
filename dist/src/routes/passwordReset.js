"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/passwordReset.ts
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
// Create a nodemailer transporter using Gmail or another service
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Request Password Reset Route
router.post('/reset-password/request', async (req, res) => {
    const { email } = req.body;
    try {
        // Find the user by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate a password reset token securely
        const resetToken = crypto_1.default.randomBytes(20).toString('hex');
        const resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
        // Update the user's resetToken and resetTokenExpiration
        user.passwordResetToken = resetToken;
        user.passwordResetTokenExpiry = resetTokenExpiration;
        await user.save();
        // Send the password reset email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            to: email,
            subject: 'Password Reset Request',
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
// Handle Password Reset with Token Route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        // Find the user by token and check if the token is valid (not expired)
        const user = await user_1.User.findOne({
            where: {
                passwordResetToken: token,
                passwordResetTokenExpiry: { [sequelize_1.Op.gte]: new Date() }, // Token must not be expired
            },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        // Hash the new password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        // Clear the resetToken and resetTokenExpiry after successful password reset
        user.passwordResetToken = null;
        user.passwordResetTokenExpiry = null;
        await user.save();
        res.status(200).json({ message: 'Password successfully reset' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while resetting password' });
    }
});
exports.default = router;
