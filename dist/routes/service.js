"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import
const services_1 = __importDefault(require("@models/services")); // Correct alias for Service model
const router = (0, express_1.Router)();
// PUT route to update a service
router.put('/services/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        const serviceId = req.params.id;
        const { title, description, price } = req.body;
        const service = await services_1.default.findByPk(serviceId);
        // Check if the service exists
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return; // Make sure to return after sending the response
        }
        // Check if the authenticated user is the owner of the service
        if (!req.user || service.userId.toString() !== req.user.id) {
            res.status(403).json({ message: 'You can only edit your own services' });
            return; // Return after sending the response
        }
        // Update the service
        service.title = title;
        service.description = description;
        service.price = price;
        await service.save();
        // Return success response with updated service data
        res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (error) {
        // Fix for the error type
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating service', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error updating service', error: 'Unknown error' });
        }
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map