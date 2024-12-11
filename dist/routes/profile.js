"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import
const router = (0, express_1.Router)();
// Route to get profile
router.get('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Safely check if req.user is defined and has an id
    if (!req.user?.id) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Logic to fetch user profile (example)
        const userProfile = { id: req.user.id, username: req.user.username }; // Example response
        return res.status(200).json(userProfile);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to update profile
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    if (!req.user?.id) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Logic to update user profile (example)
        const updatedProfile = { id: req.user.id, username: req.user.username }; // Example update
        return res.status(200).json(updatedProfile);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map