const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is correct
const User = require('../models/user'); // Adjust the path if necessary
const router = express.Router();

// Protected Route for User Profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Fetch user from database using the ID from the authMiddleware
        const user = await User.findByPk(req.user.id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send only necessary user details
        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
