"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import
const user_1 = require("../models/user"); // Ensure the User model is imported
const router = (0, express_1.Router)();
// Route to get profile (requires authentication)
router.get('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Safely check if req.user is defined and has an id
    if (!req.user?.id) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Fetch user profile from the database using the ID from the token
        const user = await user_1.User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user profile
        return res.status(200).json({ user });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});
// Route to update profile (requires authentication)
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    if (!req.user?.id) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Logic to update user profile
        const { username } = req.body; // Assuming only username is being updated for this example
        const updatedUser = await user_1.User.update({ username }, { where: { id: req.user.id } });
        if (!updatedUser[0]) { // [0] represents the number of updated rows
            return res.status(404).json({ message: 'User not found or nothing to update' });
        }
        // Return updated profile
        return res.status(200).json({ message: 'Profile updated successfully', username });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map