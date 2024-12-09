"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // JWT authentication middleware
const services_1 = __importDefault(require("@models/services")); // Correct usage of alias for Service model
const router = (0, express_1.Router)();
// GET route to retrieve user profile and associated services
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        const user = req.user; // req.user comes from authenticateJWT middleware
        if (!user) {
            res.status(403).json({ message: 'User not authenticated' });
            return; // Make sure to return early to stop further execution
        }
        // Fetch services associated with the user from the services table
        const services = await services_1.default.findAll({ where: { userId: user.id } });
        // Return user profile and their associated services
        res.status(200).json({ user, services });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        next(error); // Pass error to the global error handler
    }
});
exports.default = router;
