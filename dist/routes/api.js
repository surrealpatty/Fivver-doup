"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api.ts (example)
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/services', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    // Route logic
    try {
        // Example logic for creating a service
        res.status(200).json({ message: 'Service created successfully' });
    }
    catch (error) {
        next(error); // Pass errors to the next error-handling middleware
    }
});
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    // Route logic
    try {
        res.status(200).json({ profile: req.user });
    }
    catch (error) {
        next(error); // Pass errors to the next error-handling middleware
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map