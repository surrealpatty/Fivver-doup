// src/routes/profile.js

const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); // Correct import for the middleware function
const User = require('../models/user'); // Correct import path for User model

const router = express.Router();

// Protected Route for User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Fetch user from the database using the ID from the authMiddleware
        const user = await User.findByPk(req.user.id); // Ensure req.user.id is available (provided by authenticateToken middleware)

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
    } catch (error) {
        console.error('Error fetching profile:', error); // Log the error message
        res.status(500).json({ message: 'Server error', error: error.message }); // Optionally include the error message
    }
});

module.exports = router;
