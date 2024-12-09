"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/profile.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // JWT middleware
const user_1 = require("../models/user"); // User model
const services_1 = __importDefault(require("../models/services")); // Service model
const profileRouter = (0, express_1.Router)();
// GET route for retrieving user profile and associated services
profileRouter.get('/', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        const user = req.user; // The authenticated user added by authenticateJWT middleware
        if (!user || !user.id) {
            return res.status(403).json({ message: 'User not authenticated' });
        }
        // Find the user and include their services
        const userProfile = await user_1.User.findByPk(user.id, {
            include: [services_1.default], // Eagerly load services associated with the user
        });
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        // Respond with user details and associated services
        res.status(200).json({ user: userProfile });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        next(error); // Pass errors to the error-handling middleware
    }
});
exports.default = profileRouter;
