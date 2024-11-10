"use strict";
// src/routes/api.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { User } = require('../models/user'); // Ensure path and import style is correct
const { Service } = require('../models/service'); // Ensure path and import style is correct
const authenticateToken = require('../middleware/authenticateToken'); // Authentication middleware
const router = express.Router();
// User Registration Route
router.post('/register', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Create new user
        const newUser = yield User.create({
            username,
            email,
            password: hashedPassword, // Store hashed password
        });
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.error('Error creating user:', error.message); // Improved error logging
        res.status(500).json({ message: 'Server error' });
    }
}));
// User Login Route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time (1 hour)
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Login error:', error.message); // Improved error logging
        res.status(500).json({ message: 'Server error' });
    }
}));
// Protected Profile Route
router.get('/profile', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByPk(req.user.id); // Use req.user.id from the middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id: user.id, username: user.username, email: user.email });
    }
    catch (error) {
        console.error('Profile retrieval error:', error.message); // Improved error logging
        res.status(500).json({ message: 'Server error' });
    }
}));
// Route to create a new service (Protected)
router.post('/services', authenticateToken, [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('price', 'Price must be a valid number').isFloat({ min: 0 }), // Use isFloat for price
    check('category', 'Category is required').notEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, price, category } = req.body;
    try {
        // Create new service
        const newService = yield Service.create({
            title,
            description,
            price,
            category,
            userId: req.user.id, // The authenticated user's ID
        });
        res.status(201).json(newService);
    }
    catch (error) {
        console.error('Error creating service:', error.message); // Improved error logging
        res.status(500).json({ message: 'Failed to create service' });
    }
}));
module.exports = router;
//# sourceMappingURL=api.js.map