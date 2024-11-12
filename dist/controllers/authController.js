"use strict";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// User Registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    // Input validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' }); // Conflict error
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        // Return success message instead of redirecting
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ where: { email } });
        // Check if user exists and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Set the JWT in a cookie
            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({ message: 'Login successful', token });
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// User Logout
exports.logoutUser = (req, res) => {
    res.clearCookie('jwt'); // Clear the JWT cookie on logout
    res.status(200).json({ message: 'Logout successful' }); // Return a success message
};
//# sourceMappingURL=authController.js.map