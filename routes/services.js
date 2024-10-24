const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const authenticateToken = require('../middleware/authenticateToken');

// Route to create a new service
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        const newService = await Service.create({
            title,
            description,
            price,
            category,
            userId: req.user.id, // Assuming `req.user.id` is available from the authenticated token
        });
        res.status(201).json(newService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Failed to create service' });
    }
});

module.exports = router;
