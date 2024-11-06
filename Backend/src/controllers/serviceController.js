// src/controllers/serviceController.js

import { Service } from '../models/services.js'; // Correct the import based on your file structure

// Create a new service
export const createService = async (req, res) => {
    try {
        // Create a new service using the request body data
        const newService = await Service.create(req.body);
        res.status(201).json(newService); // Return the newly created service
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Failed to create service', error });
    }
};

// Get all services
export const getServices = async (req, res) => {
    try {
        // Fetch all services from the database
        const services = await Service.findAll();
        res.json(services); // Return the list of services
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Failed to fetch services', error });
    }
};

// Update a service by ID
export const updateService = async (req, res) => {
    const { serviceId } = req.params;
    try {
        // Find the service by primary key (ID)
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Update the service with new data from the request body
        await service.update(req.body);
        res.json(service); // Return the updated service
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Failed to update service', error });
    }
};

// Delete a service by ID
export const deleteService = async (req, res) => {
    const { serviceId } = req.params;
    try {
        // Find the service by primary key (ID)
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Delete the service
        await service.destroy();
        res.status(204).send(); // 204 No Content - service successfully deleted
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Failed to delete service', error });
    }
};
