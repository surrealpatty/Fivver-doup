// src/controllers/serviceController.js

import Service from '../models/service.js'; // Adjust the path to your model as needed

// Create a new service
export const createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json(newService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Failed to create service', error });
    }
};

// Get all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Failed to fetch services', error });
    }
};

// Update a service by ID
export const updateService = async (req, res) => {
    const { serviceId } = req.params;
    try {
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.update(req.body);
        res.json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Failed to update service', error });
    }
};

// Delete a service by ID
export const deleteService = async (req, res) => {
    const { serviceId } = req.params;
    try {
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.destroy();
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Failed to delete service', error });
    }
};
