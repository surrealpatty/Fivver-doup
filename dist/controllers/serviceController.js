"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = void 0;
const services_1 = __importDefault(require("@models/services")); // Assuming your Service model is here
const updateService = async (req, res, next) => {
    const { id } = req.params; // Get the service ID from the route parameter
    const { title, description, price } = req.body; // Get new data from the request body
    try {
        // Ensure req.user is defined before accessing req.user.id
        if (!req.user || typeof req.user.id !== 'number') {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Find the service by ID
        const service = await services_1.default.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Ensure that req.user.id is of the same type as service.userId
        if (service.userId !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to edit this service' });
        }
        // Update the service with new values
        service.title = title || service.title;
        service.description = description || service.description;
        service.price = price || service.price;
        // Save the updated service
        await service.save();
        // Send the response with the updated service
        res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (error) {
        console.error('Error updating service:', error);
        next(error); // Pass error to the global error handler
    }
};
exports.updateService = updateService;
