"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = void 0;
const services_1 = __importDefault(require("../models/services")); // Import the Service model
const updateService = async (req, res) => {
    const { id } = req.params; // Extract the ID of the service to update
    const { name, description, price } = req.body; // Extract data from the request body
    try {
        // Find the service by ID
        const service = await services_1.default.findByPk(id);
        if (!service) {
            // If service doesn't exist, return a 404 response
            res.status(404).json({ message: 'Service not found' });
            return; // After sending a response, return to avoid further code execution
        }
        // Check if the incoming data is valid
        if (name)
            service.name = name;
        if (description)
            service.description = description;
        if (price) {
            // Ensure price is a valid number
            if (isNaN(price)) {
                res.status(400).json({ message: 'Invalid price value' });
                return;
            }
            service.price = price;
        }
        // Save the updated service in the database
        await service.save();
        // Respond with success message and updated service
        res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (error) {
        // Handle any errors that occur
        if (error instanceof Error) {
            // Return the error message if the error is an instance of Error
            res.status(500).json({ message: 'Error updating service', error: error.message });
        }
        else {
            // For unknown errors, return a generic message
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};
exports.updateService = updateService;
