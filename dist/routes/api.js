"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("@models/user"); // Correctly resolving user model
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Ensure this middleware is correctly defined
const service_1 = __importDefault(require("@models/service")); // Correct named import for Service model
const router = (0, express_1.Router)();
// POST route to create a service
router.post('/services', authMiddleware_1.checkAuth, // Ensure this middleware is correctly defined
async (req, res) => {
    try {
        // Type the request body using ServiceCreationAttributes for type safety
        const { userId, title, description, price } = req.body;
        // Validate required fields
        if (!userId || !title || !description || price === undefined) {
            res.status(400).json({
                message: 'Missing required fields: userId, title, description, and price are mandatory.',
                error: 'ValidationError',
            });
            return;
        }
        // Validate price
        if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
            res.status(400).json({
                message: 'Invalid price: must be a positive number.',
                error: 'ValidationError',
            });
            return;
        }
        // Check if the user exists
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                message: `User with ID ${userId} not found.`,
                error: 'NotFoundError',
            });
            return;
        }
        // Create a new service for the user
        const service = await service_1.default.create({
            userId,
            title,
            description,
            price,
        });
        // Send success response
        res.status(201).json({
            message: 'Service created successfully.',
            serviceId: service.id,
            title: service.title,
        });
    }
    catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            message: 'Internal server error while creating the service.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map