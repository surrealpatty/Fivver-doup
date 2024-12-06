"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import path
const router = (0, express_1.Router)();
// Explicitly type the route handler as RequestHandler
router.post('/services', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Your service creation logic here
        res.status(200).json({ message: 'Service created successfully' });
    }
    catch (error) {
        next(error); // Pass errors to the next error-handling middleware
    }
});
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized');
            return; // Return to stop execution
        }
        res.status(200).json({ profile: req.user }); // Safely access req.user
    }
    catch (error) {
        next(error); // Pass errors to the next error-handling middleware
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map