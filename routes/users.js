const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust the path if necessary
const { check, validationResult } = require('express-validator'); // To validate input
const router = express.Router();

// User Registration Route
router.post(
    '/register',
    [
        // Validate the input fields
        check('username', 'Username is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword, // Store the hashed password
            });

            // Respond with user info (avoid sending password)
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                },
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;
