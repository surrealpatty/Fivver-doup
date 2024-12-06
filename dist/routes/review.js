"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import for authenticateJWT
const router = (0, express_1.Router)();
// POST route to create a new review
router.post('/', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Ensure req.user is authenticated and has a tier
        if (req.user && req.user.tier) {
            // Logic to create a review (e.g., saving it in the database)
            // Example: Save review to DB
            // const review = await Review.create({ userId: req.user.id, content: req.body.content, serviceId: req.body.serviceId });
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
router.get('/:serviceId', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Ensure req.user is authenticated
        if (req.user) {
            const serviceId = req.params.serviceId;
            // Logic to fetch reviews for the given serviceId (e.g., querying the database)
            // Example: Fetch reviews for the service
            // const reviews = await Review.findAll({ where: { serviceId: serviceId } });
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
//# sourceMappingURL=review.js.map