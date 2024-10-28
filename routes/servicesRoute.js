// routes/servicesRoute.js

const express = require('express');
const router = express.Router();
const Service = require('../models/services'); // Ensure the path to the model is correct
const { body, validationResult } = require('express-validator'); // For input validation
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this is the correct path

// 1. Create a new service
router.post(
    '/',
    authMiddleware, // Protect the route
    [
        // Validate input data
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price } = req.body;

        try {
            // Ensure userId is attached from authMiddleware
            const userId = req.user.id;

            // Create the service
            const service = await Service.create({
                title,
                description,
                price,
                userId,
            });

            res.status(201).json(service);
        } catch (error) {
            console.error('Error creating service:', error.message);
            res.status(500).json({ message: 'Error creating service', error: error.message });
        }
    }
);

// 2. Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error.message);
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
});

// 3. Get a service by ID
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
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
});

// 4. Update a service
router.put(
    '/:id',
    authMiddleware, // Protect the route
    [
        // Validate fields if provided
        body('title').optional().notEmpty().withMessage('Title cannot be empty if provided'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty if provided'),
        body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number if provided'),
    ],
    async (req, res) => {
        const { id } = req.params;

        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            if (service.userId !== req.user.id) {
                return res.status(403).json({ message: 'Unauthorized to update this service' });
            }
            await service.update(req.body); // Update with all fields in the body
            res.json(service);
        } catch (error) {
            console.error('Error updating service:', error.message);
            res.status(500).json({ message: 'Error updating service', error: error.message });
        }
    }
);

// 5. Delete a service
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        if (service.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this service' });
        }
        await service.destroy();
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error.message);
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
});

module.exports = router;
