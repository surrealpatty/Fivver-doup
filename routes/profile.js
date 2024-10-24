const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware'); // Ensure this is the correct import for middleware
const User = require('../models/user'); // Ensure the correct path and import method for User model
const router = express.Router();

// Protected Route for User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Fetch user from the database using the ID from the authMiddleware
        const user = await User.findByPk(req.user.id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send only necessary user details
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message); // Log the error message
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
