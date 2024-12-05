"use strict";
// src/routes/profile.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    if (!req.user) {
        res.status(403).json({ message: 'User not authenticated' });
        return; // Ensure flow terminates after returning the response
    }
    // Profile logic here...
    res.status(200).json({ profile: req.user }); // Send the profile
});
//# sourceMappingURL=profile.js.map