const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path if necessary
const Service = require('../models/service'); // Ensure this path is correct
const { check, validationResult } = require('express-validator'); // For input validation
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for token authentication

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

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Example of a Protected Route for User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Use req.user.id set by the middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        console.error('Profile retrieval error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to create a new service
router.post('/services', authenticateToken, async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        const newService = await Service.create({
            title,
            description,
            price,
            category,
            userId: req.user.id, // Assuming `req.user.id` is available from the authenticated token
        });
        res.status(201).json(newService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Failed to create service' });
    }
});

module.exports = router; // Ensure this line is present
