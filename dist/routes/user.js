"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user"); // Ensure this path is correct
const userController_1 = require("../controllers/userController"); // Import password reset logic
const router = (0, express_1.Router)();
// POST /api/users/login - Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Find the user by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in .env
        { expiresIn: '1h' } // Token expires in 1 hour
        );
        // Send the token as the response
        return res.status(200).json({
            message: 'Login successful',
            token, // The JWT token returned to the client
        });
    }
    catch (error) {
        // Log the error
        console.error('Error logging in:', error);
        // Respond with a generic server error message
        return res.status(500).json({ message: 'Server error' });
    }
});
// POST /api/users/reset-password/request - Password Reset Request Route
router.post('/reset-password/request', async (req, res) => {
    try {
        // Delegate the reset password logic to the controller
        await (0, userController_1.requestPasswordReset)(req, res);
    }
    catch (error) {
        // Handle unexpected errors in the route itself
        console.error('Error handling password reset request:', error);
        return res.status(500).json({ message: 'Failed to process password reset request' });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map