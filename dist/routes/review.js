"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import for authenticateToken
const router = (0, express_1.Router)();
// POST route to create a new review
router.post('/', authMiddleware_1.authenticateToken, async (req, res, next) => {
    try {
        // Ensure that the user is authenticated and has the necessary 'tier' property
        if (!req.user || !req.user.tier) {
            return res.status(400).json({ message: 'User tier is missing or user is not authenticated.' });
        }
        // Logic to create a review (e.g., saving it in the database)
        // Replace this with actual review creation logic
        return res.status(201).json({ message: 'Review created successfully.' });
    }
    catch (err) {
        next(err); // Pass errors to the error handler
    }
});
// GET route to fetch reviews for a specific service
router.get('/:serviceId', authMiddleware_1.authenticateToken, async (req, res, next) => {
    try {
        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(400).json({ message: 'User not authenticated.' });
        }
        const serviceId = req.params.serviceId;
        // Logic to fetch reviews for the service (e.g., querying the database)
        // Replace this with actual review fetching logic
        return res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
    }
    catch (err) {
        next(err); // Pass errors to the error handler
    }
});
exports.default = router;
//# sourceMappingURL=review.js.map