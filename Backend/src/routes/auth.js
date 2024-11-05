// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs'); // Ensure you are using bcryptjs for consistency
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticateToken = require('../middlewares/auth'); // Ensure you have this middleware
const { check, validationResult } = require('express-validator'); // Import express-validator for input validation

const router = express.Router();

// User Registration
router.post('/register', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // Hash the password and create the new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, password: hashedPassword });
            
            // Send success response
            res.status(201).json({ message: 'User created', userId: newUser.id });
        } catch (error) {
            console.error('Registration error:', error.message); // Improved error logging
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// User Login
router.post('/login', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').notEmpty()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // Send token in response
            res.status(200).json({ token });
        } catch (error) {
            console.error('Login error:', error.message); // Improved error logging
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Example of a Protected Route
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Ensure req.user is set by authenticateToken middleware
        const user = await User.findByPk(req.user.id); // Ensure the middleware sets req.user correctly
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Send user profile information
        res.json({ id: user.id, email: user.email });
    } catch (error) {
        console.error('Profile retrieval error:', error.message); // Improved error logging
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
