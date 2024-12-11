"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/profile.ts
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import for authenticateToken middleware
const services_1 = __importDefault(require("../models/services")); // Import the Service model
const user_1 = require("../models/user"); // Import the User model
const router = (0, express_1.Router)();
// GET profile route
router.get('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Check if user is undefined or missing necessary properties (id and tier)
    if (!req.user || !req.user.id || !req.user.tier) {
        return res.status(401).json({ message: 'User not authenticated or missing tier information' });
    }
    const userId = req.user.id; // Extract user ID from the authenticated token
    try {
        // Fetch the user information from the database
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Fetch the services associated with the user
        const services = await services_1.default.findAll({ where: { userId } });
        return res.status(200).json({
            message: 'User profile retrieved successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                tier: req.user.tier, // Include tier information from the authenticated user
            },
            services,
        });
    }
    catch (err) {
        console.error(err);
        next(err); // Pass the error to the next middleware for handling
    }
});
// PUT profile route
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Check if user is undefined or missing necessary properties (id and tier)
    if (!req.user || !req.user.id || !req.user.tier) {
        return res.status(401).json({ message: 'User not authenticated or missing tier information' });
    }
    const userId = req.user.id; // Extract user ID from the authenticated token
    const { username, email } = req.body; // Extract updated profile details from request body
    try {
        // Fetch the user from the database
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user details
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        // Save the updated user to the database
        await user.save();
        return res.status(200).json({
            message: 'User profile updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                tier: req.user.tier, // Include the updated 'tier' information from the authenticated user
            },
        });
    }
    catch (err) {
        console.error(err);
        next(err); // Pass the error to the next middleware for handling
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map