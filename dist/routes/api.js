"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Updated route handler with correct async signature
router.post('/services', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    if (!req.user) {
        res.status(403).json({ message: 'User not authenticated' });
        return; // Ensure flow terminates after returning the response
    }
    if (!req.user.tier) {
        res.status(400).json({ message: 'User tier is missing' });
        return; // Ensure flow terminates after returning the response
    }
    // Proceed with creating or updating the service logic here...
    res.status(201).json({ message: 'Service created successfully' });
    // If needed, you can also call next() to pass control to further middleware
});
//# sourceMappingURL=api.js.map