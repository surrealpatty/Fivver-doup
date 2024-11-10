"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// User Registration
exports.registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Input validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = yield User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' }); // Conflict error
        }
        // Hash the password before saving
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield User.create({ username, email, password: hashedPassword });
        // Return success message instead of redirecting
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// User Login
exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const user = yield User.findOne({ where: { email } });
        // Check if user exists and password matches
        if (user && (yield bcrypt.compare(password, user.password))) {
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
});
// User Logout
exports.logoutUser = (req, res) => {
    res.clearCookie('jwt'); // Clear the JWT cookie on logout
    res.status(200).json({ message: 'Logout successful' }); // Return a success message
};
//# sourceMappingURL=authController.js.map