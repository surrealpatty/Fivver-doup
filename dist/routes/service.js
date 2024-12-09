"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = __importDefault(require("@models/services")); // Ensure this import is correct
const express_validator_1 = require("express-validator");
const authenticateToken_1 = __importDefault(require("@middlewares/authenticateToken")); // Ensure the token middleware is correct
const router = (0, express_1.Router)();
// Update service route
router.put('/update/:serviceId', authenticateToken_1.default, // Protect route
[
    (0, express_validator_1.body)('name').isLength({ min: 3 }).withMessage('Service name is required'),
    (0, express_validator_1.body)('description').isLength({ min: 5 }).withMessage('Description is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a valid number'),
], async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }); // Just call `res` without returning it
        return; // Don't return `res`, just exit the function here
    }
    const { name, description, price } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the service by ID and check if it belongs to the user
        const service = await services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: 'Service not found' }); // Just call `res` without returning it
            return;
        }
        // Typecasting userId to number for comparison with service.userId
        if (service.userId !== Number(userId)) {
            res.status(403).json({ message: 'You are not authorized to update this service' }); // Just call `res` without returning it
            return;
        }
        // Update the service
        service.name = name;
        service.description = description;
        service.price = price;
        await service.save();
        res.status(200).json({ message: 'Service updated successfully', service }); // Just call `res` without returning it
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' }); // Just call `res` without returning it
    }
});
// Delete service route
router.delete('/delete/:serviceId', authenticateToken_1.default, // Protect route
async (req, res, next) => {
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the service by ID and check if it belongs to the user
        const service = await services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: 'Service not found' }); // Just call `res` without returning it
            return;
        }
        // Check if the service belongs to the logged-in user
        if (service.userId !== Number(userId)) {
            res.status(403).json({ message: 'You are not authorized to delete this service' }); // Just call `res` without returning it
            return;
        }
        // Delete the service
        await service.destroy();
        res.status(200).json({ message: 'Service deleted successfully' }); // Just call `res` without returning it
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' }); // Just call `res` without returning it
    }
});
exports.default = router;
