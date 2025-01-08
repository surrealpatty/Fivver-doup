"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ServiceController", {
    enumerable: true,
    get: function() {
        return ServiceController;
    }
});
const _services = require("../models/services");
class ServiceController {
    // Create a new service
    static createService = async (req, res)=>{
        try {
            const { title, description, price } = req.body;
            const userId = req.user?.id; // Assuming userId is set in the request (e.g., via authentication middleware)
            // Validate the incoming data
            if (!title || !description || !price || !userId) {
                return res.status(400).json({
                    message: 'All fields (title, description, price) and userId are required.'
                });
            }
            // Add a role field if it's required in your Service model
            const role = 'user'; // Add a default or dynamically determined role here
            // Create the service in the database
            const service = await _services.Service.create({
                title,
                description,
                price,
                userId,
                role
            });
            return res.status(201).json({
                message: 'Service created successfully',
                service
            });
        } catch (error) {
            console.error('Error creating service:', error);
            return res.status(500).json({
                message: 'Service creation failed',
                error
            });
        }
    };
    // Fetch all services
    static getServices = async (req, res)=>{
        try {
            const services = await _services.Service.findAll(); // Fetch all services
            return res.json(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            return res.status(500).json({
                message: 'Failed to fetch services',
                error
            });
        }
    };
}
