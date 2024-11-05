// src/routes/user.js
import express from 'express';
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user'); // Ensure this path is correct
const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
    // Define your routes here
router.get('/', (req, res) => {
    res.send('User route');
  });
  
 
});

// Optional: Add a registration route or other user-related routes here

// Export the router
module.exports = router;
