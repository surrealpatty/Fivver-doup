"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/profile.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // JWT middleware
const services_1 = __importDefault(require("@models/services")); // Use alias correctly
const router = (0, express_1.Router)();
// GET route for retrieving user profile and associated services
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        const user = req.user; // req.user comes from the authenticateJWT middleware
        if (!user) {
            res.status(403).json({ message: 'User not authenticated' });
            return;
        }
        // Fetch services for the user
        const services = await services_1.default.findAll({ where: { userId: user.id } });
        // Return the user data and associated services
        res.status(200).json({ user, services });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        next(error); // Pass error to the next error handler
    }
});
exports.default = router;
