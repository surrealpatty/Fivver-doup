"use strict";
// src/routes/profile.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Profile route with authentication
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    // Check if req.user is not defined
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Destructure user data from req.user
    const { id, email, username, tier } = req.user;
    // Return user profile in response
    return res.json({ id, email, username, tier });
});
exports.default = router;
//# sourceMappingURL=profile.js.map