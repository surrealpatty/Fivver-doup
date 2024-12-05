"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/services', authMiddleware_1.authenticateJWT, async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not authenticated' });
    }
    // Make sure the 'tier' exists in req.user
    if (!req.user.tier) {
        return res.status(400).json({ message: 'User tier is missing' });
    }
    // rest of your route logic...
});
//# sourceMappingURL=api.js.map