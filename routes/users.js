const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust path if necessary
const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

module.exports = router;
