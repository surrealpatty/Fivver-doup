"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// POST route to create a new review
router.post('/', authenticateJWT, async (req, res, next) => {
    try {
        // Ensure req.user is authenticated and has a tier
        if (req.user && req.user.tier) {
            // Logic to create a review (e.g., saving it in the database)
            res.status(201).json({ message: 'Review created successfully.' });
        }
        else {
            res.status(400).json({ message: 'User tier is missing.' });
        }
    }
    catch (err) {
        next(err); // Pass errors to the error handler
    }
});
// GET route to fetch reviews for a specific service
router.get('/:serviceId', authenticateJWT, async (req, res, next) => {
    try {
        if (req.user) {
            const serviceId = req.params.serviceId;
            // Logic to fetch reviews for the service
            res.status(200).json({ message: 'Reviews fetched successfully.' });
        }
        else {
            res.status(400).json({ message: 'User not authenticated.' });
        }
    }
    catch (err) {
        next(err); // Pass errors to the error handler
    }
});
exports.default = router;
