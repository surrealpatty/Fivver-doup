const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to authenticate

// Profile route (GET)
router.get('/profile', authenticateToken, (req, res) => {
    // Logic for fetching user profile
    res.json({
        id: req.user.id,        // Assumes user is added to req by authenticateToken middleware
        username: req.user.username,
        email: req.user.email
    });
});

// Update Profile (PUT)
router.put('/profile/update', authenticateToken, (req, res) => {
    // Logic for updating user profile
    res.json({ message: 'Profile updated successfully' });
});

module.exports = router;
