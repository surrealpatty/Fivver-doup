"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import path
const user_1 = require("../models/user"); // Correct import for User model
const router = (0, express_1.Router)();
// Route to fetch the user's profile data
router.get('/profile', authMiddleware_1.authenticateJWT, // Ensure the JWT middleware is applied to protect the route
async (req, res) => {
    const userId = req.user?.id; // Access user info from the JWT payload
    if (!userId) {
        res.status(400).json({ message: 'User ID is missing or invalid' });
        return; // End function early if the user ID is invalid
    }
    try {
        // Fetch user profile from the database
        const userProfile = await user_1.User.findByPk(userId);
        if (!userProfile) {
            res.status(404).json({ message: 'User profile not found' });
            return; // End function early if the profile is not found
        }
        // Return profile data
        res.status(200).json({
            message: 'Profile data fetched successfully',
            profile: {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email,
            },
        });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map