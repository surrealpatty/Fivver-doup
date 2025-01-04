"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken")); // Ensure the correct path to the middleware
const router = (0, express_1.Router)();
// Define the premium service route with authentication
router.get('/premium-service', authenticateToken_1.default, (req, res) => {
    // Check if the user object exists and the user has a 'paid' tier
    if (req.user?.tier === 'paid') {
        res.status(200).json({ message: 'Premium service access granted.' });
    }
    else if (req.user) {
        res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    }
    else {
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
});
exports.default = router;
