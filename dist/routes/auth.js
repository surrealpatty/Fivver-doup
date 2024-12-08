"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController"); // Import controller functions
const router = (0, express_1.Router)();
// Registration Route
router.post('/register', async (req, res) => {
    try {
        await (0, authController_1.registerUser)(req, res); // Call the registerUser function from the controller
    }
    catch (error) {
        console.error('Registration error:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error during user registration.' });
    }
});
// Login Route
router.post('/login', async (req, res) => {
    try {
        await (0, authController_1.loginUser)(req, res); // Call the loginUser function from the controller
    }
    catch (error) {
        console.error('Login error:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error during login.' });
    }
});
exports.default = router;
