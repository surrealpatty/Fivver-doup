"use strict";
// src/routes/service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// GET route example
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        // Safely access user data, ensuring 'user' exists
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const { id, email, username, tier } = req.user; // Accessing user data with 'tier'
        res.json({ message: `User ${username} with tier ${tier}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching services.' });
    }
});
// PUT route example
router.put('/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        // Safely check if user is authenticated and their tier
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
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