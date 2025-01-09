// src/routes/passwordReset.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _sequelize = require("sequelize");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const router = (0, _express.Router)();
// Create a nodemailer transporter using Gmail or another service
const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Request Password Reset Route
router.post('/reset-password/request', async (req, res)=>{
    const { email } = req.body;
    try {
        // Find the user by email
        const user = await _user.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Generate a password reset token securely
        const resetToken = _crypto.default.randomBytes(20).toString('hex');
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
            text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: 'Password reset link sent to your email.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error while processing password reset request'
        });
    }
});
// Handle Password Reset with Token Route
router.post('/reset-password/:token', async (req, res)=>{
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        // Find the user by token and check if the token is valid (not expired)
        const user = await _user.default.findOne({
            where: {
                passwordResetToken: token,
                passwordResetTokenExpiry: {
                    [_sequelize.Op.gte]: new Date()
                }
            }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired token'
            });
        }
        // Hash the new password before saving it
        const hashedPassword = await _bcryptjs.default.hash(newPassword, 10);
        user.password = hashedPassword;
        // Clear the resetToken and resetTokenExpiry after successful password reset
        user.passwordResetToken = null;
        user.passwordResetTokenExpiry = null;
        await user.save();
        res.status(200).json({
            message: 'Password successfully reset'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error while resetting password'
        });
    }
});
const _default = router;
