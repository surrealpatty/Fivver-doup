const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user'); // Adjust the path if necessary
const router = express.Router();

// Protected Route Example
router.get('/api/users/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Get user info from the database
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: { id: user.id, email: user.email } }); // Return user profile
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;  
