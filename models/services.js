const express = require('express');
const router = express.Router();
const { Model: Service } = require('../models/services'); // Ensure this points to the correct file
const { check, validationResult } = require('express-validator');

// Middleware for validation
const validateService = [
    check('title')
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters long'),
    check('description')
        .notEmpty()
        .withMessage('Description cannot be empty'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a valid number greater than or equal to zero'),
];

// Create a new service
router.post('/', validateService, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const service = await Service.create(req.body);
        res.status(201).json({ service });
    } catch (error) {
        console.error('Error creating service:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        console.error('Error retrieving services:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving services', error: error.message });
    }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error retrieving service:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving service', error: error.message });
    }
});

// Update a service
router.put('/:id', validateService, async (req, res) => {
    try {
        const [updated] = await Service.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const updatedService = await Service.findByPk(req.params.id);
        res.status(200).json({ service: updatedService });
    } catch (error) {
        console.error('Error updating service:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating service', error: error.message });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Service.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error deleting service:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
});

// Export the router
module.exports = router;
