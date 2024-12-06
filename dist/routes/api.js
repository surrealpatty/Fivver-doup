"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Updated route handler with correct async signature
router.post('/services', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            res.status(403).json({ message: 'User not authenticated' });
            return; // Ensure flow terminates after returning the response
        }
        // Ensure user has a tier assigned
        if (!req.user.tier) {
            res.status(400).json({ message: 'User tier is missing' });
            return; // Ensure flow terminates after returning the response
        }
        // Proceed with creating or updating the service logic here
        res.status(201).json({ message: 'Service created successfully' });
    }
    catch (error) {
        next(error); // Pass errors to the error handler
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map