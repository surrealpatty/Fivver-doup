const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Create a new service
router.post('/', async (req, res) => {
    const { title, description, price } = req.body;
    try {
        const service = await Service.create({ title, description, price, sellerId: req.user.id });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service' });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});

// Get a service by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service' });
    }
});

// Update a service
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.update({ title, description, price });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service' });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.destroy();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service' });
    }
});

module.exports = router;
