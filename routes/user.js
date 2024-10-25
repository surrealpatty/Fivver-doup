const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Adjust the path if necessary
const User = require('../models/user'); // Adjust the path if necessary

// Profile route (GET)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Fetch the user from the database using the ID from the token
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user information (omit password)
        res.json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Profile (PUT)
router.put('/profile/update', authenticateToken, async (req, res) => {
    const { username, email } = req.body;

    // Input validation
    if (!username && !email) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    try {
        // Find the user in the database
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user information if provided
        if (username) user.username = username;
        if (email) user.email = email;

        // Save the updated user data
        await user.save();

        res.json({ message: 'Profile updated successfully', user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
