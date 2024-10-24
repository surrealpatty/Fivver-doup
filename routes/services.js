const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Ensure the path is correct

// Create a new service
router.post('/', async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (service) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Service.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedService = await Service.findByPk(req.params.id);
            res.status(200).json(updatedService);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Service.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
