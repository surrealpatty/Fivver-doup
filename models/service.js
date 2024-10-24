const express = require('express');
const Service = require('../models/service'); // Ensure this points to your Service model
const authenticateToken = require('../middleware/auth'); // Ensure your authentication middleware is imported
const router = express.Router();

// Create a Service
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        const newService = await Service.create({
            title,
            description,
            price,
            category,
            userId: req.userId, // Ensure this matches your user ID property
        });
        res.status(201).json(newService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a Specific Service
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error('Error retrieving service:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a Service
router.put('/:id', authenticateToken, async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Ensure only the service owner can update
        if (service.userId !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await service.update({ title, description, price, category });
        res.json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a Service
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Ensure only the service owner can delete
        if (service.userId !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await service.destroy();
        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
