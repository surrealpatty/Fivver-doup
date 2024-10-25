const express = require('express');
const router = express.Router();
const Service = require('../models/service'); // Ensure the path to the model is correct
const { body, validationResult } = require('express-validator'); // Import express-validator for validation

// Create a new service
router.post(
    '/',
    [
        // Validate input data
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price } = req.body;
        try {
            const service = await Service.create({
                title,
                description,
                price,
                userId: req.user.id, // Ensure you're using the correct field name for the user ID
            });
            res.status(201).json(service);
        } catch (error) {
            console.error('Error creating service:', error.message);
            res.status(500).json({ message: 'Error creating service' });
        }
    }
);

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error.message);
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
        console.error('Error fetching service:', error.message);
        res.status(500).json({ message: 'Error fetching service' });
    }
});

// Update a service
router.put(
    '/:id',
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty if provided'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty if provided'),
        body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number if provided'),
    ],
    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            await service.update(req.body); // Update with all fields in the body
            res.json(service);
        } catch (error) {
            console.error('Error updating service:', error.message);
            res.status(500).json({ message: 'Error updating service' });
        }
    }
);

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
        console.error('Error deleting service:', error.message);
        res.status(500).json({ message: 'Error deleting service' });
    }
});

module.exports = router;
