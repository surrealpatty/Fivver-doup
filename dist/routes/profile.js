"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js")); // Correct import for the middleware function
const user_js_1 = require("../models/user.js"); // Correct import path for User model (if exported using named export)
const router = express_1.default.Router();
// Protected Route for User Profile
router.get('/profile', authMiddleware_js_1.default, async (req, res) => {
    try {
        // Fetch user from the database using the ID from the authMiddleware
        const user = await user_js_1.User.findByPk(req.user.id); // Ensure req.user.id is available (provided by authenticateToken middleware)
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send only necessary user details
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    }
    catch (error) {
        console.error('Error fetching profile:', error); // Log the error message
        res.status(500).json({ message: 'Server error', error: error.message }); // Optionally include the error message
    }
});
exports.default = router; // Use ES module export
//# sourceMappingURL=profile.js.map