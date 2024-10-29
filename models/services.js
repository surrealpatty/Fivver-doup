const express = require('express');
const router = express.Router();
const { Model: Service } = require('../models/service'); // Adjust path as necessary
const { check, validationResult } = require('express-validator');

// Create a new service
router.post('/', [
    check('title').isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters long'),
    check('description').notEmpty().withMessage('Description cannot be empty'),
    check('price').isFloat({ min: 0 }).withMessage('Price must be a valid number greater than or equal to zero'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const service = await Service.create(req.body);
        res.status(201).json({ service });
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving services', error });
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
        res.status(500).json({ message: 'Error retrieving service', error });
    }
});

// Update a service
router.put('/:id', async (req, res) => {
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
        res.status(500).json({ message: 'Error updating service', error });
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

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
});

// Export the router
module.exports = router;
