"use strict";
// src/routes/premiumService.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import path
const router = (0, express_1.Router)();
// Define the premium service route with authentication
router.get('/premium-service', authenticateToken_1.authenticateToken, (req, res) => {
    // Check if the user is authenticated and has a 'paid' tier
    if (req.user && req.user.tier === 'paid') {
        res.status(200).json({ message: 'Premium service access granted.' });
    }
    else {
        res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    }
});
exports.default = router;
