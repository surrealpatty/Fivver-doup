"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import
const user_1 = require("@models/user"); // Correct alias for User model
const services_1 = __importDefault(require("@models/services")); // Correct alias for Service model
const router = (0, express_1.Router)();
// POST route to create a service
router.post('/services', // Define the endpoint
authMiddleware_1.authenticateJWT, // Apply the authentication middleware
async (req, res) => {
    try {
        // Destructure and type the request body using ServiceCreationAttributes
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
        // Check if the user exists (use the userId from the authenticated request)
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                message: `User with ID ${userId} not found.`,
                error: 'NotFoundError',
            });
            return;
        }
        // Create a new service for the user
        const service = await services_1.default.create({
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
// PUT route to update a service
router.put('/services/:id', // Define the endpoint with the service ID in the route
authMiddleware_1.authenticateJWT, // Apply the authentication middleware
async (req, res) => {
    try {
        const serviceId = req.params.id;
        const { title, description, price } = req.body;
        // Find the service by ID
        const service = await services_1.default.findByPk(serviceId);
        if (!service) {
            // If service is not found, return 404
            return res.status(404).json({ message: 'Service not found' });
        }
        // Check if the authenticated user is the owner of the service
        if (service.userId !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own services' });
        }
        // Update the service fields
        service.title = title;
        service.description = description;
        service.price = price;
        // Save the updated service
        await service.save();
        // Return a success message
        res.status(200).json({ message: 'Service updated successfully' });
    }
    catch (error) {
        // Handle errors and return a 500 response
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Error updating service', error: error instanceof Error ? error.message : 'UnknownError' });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map