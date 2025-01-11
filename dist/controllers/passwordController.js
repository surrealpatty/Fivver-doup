"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user")); // Import the User model
// Fixed resetPassword handler
const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        // Find the user by email
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return; // Ensure no further code is executed
        }
        // Hash the new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update the user's password
        await user.update({ password: hashedPassword });
        // Send a success response
        res.status(200).json({ message: 'Password reset successful.' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error resetting password:', error.message);
            res.status(500).json({ message: 'Server error during password reset.', error: error.message });
        }
        else {
            console.error('Unknown error during password reset:', error);
            res.status(500).json({ message: 'Unknown server error' });
        }
        // Ensure the error is passed to the next middleware
        next(error);
    }
};
exports.resetPassword = resetPassword;
