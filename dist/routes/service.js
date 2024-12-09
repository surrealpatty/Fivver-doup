"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/service.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // JWT middleware
const service_1 = require("../models/service"); // Adjust the import path as needed
const serviceRouter = (0, express_1.Router)();
// PUT route for updating a service by ID
serviceRouter.put('/:id', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        const { id } = req.params; // Get service ID from the route parameter
        const { title, description, price } = req.body; // Destructure properties from request body
        // Find the service by ID
        const service = await service_1.Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' }); // Handle service not found
        }
        // Update the service details
        await service.update({ title, description, price });
        // Respond with the updated service
        return res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (err) {
        next(err); // Pass errors to the error handling middleware
    }
});
exports.default = serviceRouter;
