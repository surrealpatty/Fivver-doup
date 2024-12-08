"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = void 0;
const services_1 = __importDefault(require("../models/services")); // Import the Service model correctly from your models directory
const updateService = async (req, res) => {
    const { id } = req.params; // Extract the ID of the service to update
    const { name, description, price } = req.body; // Extract data from the request body
    try {
        // Find the service by ID
        const service = await services_1.default.findByPk(id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        // Update service properties with provided data (or keep existing values)
        service.name = name ?? service.name;
        service.description = description ?? service.description;
        service.price = price ?? service.price;
        // Save the updated service in the database
        await service.save();
        // Respond with success message and updated service
        res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (error) {
        // Handle any errors that occur
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating service', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};
exports.updateService = updateService;
