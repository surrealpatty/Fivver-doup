"use strict";
// src/routes/service.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// GET route example to fetch services
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        // Safely check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        // Destructure user data, ensuring 'tier' is available
        const { id, email, username, tier } = req.user;
        // Logic for retrieving services, considering the user's tier
        res.json({ message: `User ${username} with tier ${tier}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching services.' });
    }
});
// PUT route example to update a service
router.put('/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        // Safely check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        // Check if the user has the required tier for editing the service
        if (req.user.tier !== 'paid') {
            return res.status(403).json({ message: 'Access denied. You need a paid tier to edit services.' });
        }
        // Proceed with service update logic (Add your specific logic here)
        res.json({ message: 'Service updated successfully.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating service.' });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map