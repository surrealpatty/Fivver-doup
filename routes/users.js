const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path if necessary
const router = express.Router();

// User Registration Route
router.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Input validation (you can add more robust validation)
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
