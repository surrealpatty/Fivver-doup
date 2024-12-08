"use strict";
// src/controllers/serviceController.js
const { Service } = require('../models'); // Import the Service model
// Update a service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params; // Extract service ID from the URL params
        const { title, description, price } = req.body; // Extract data from the request body
        // Attempt to find the service by primary key (ID)
        const service = await Service.findByPk(id);
        // If the service is not found, respond with a 404 error
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Update service details if new values are provided
        service.title = title ?? service.title; // Only update if value is provided
        service.description = description ?? service.description;
        service.price = price ?? service.price;
        // Save the updated service object to the database
        await service.save();
        // Respond with success message and the updated service data
        return res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the service' });
    }
};
