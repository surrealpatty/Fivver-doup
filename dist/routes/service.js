"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        const { id, email, username, tier } = req.user; // Accessing user data with 'tier'
        res.json({ message: `User ${username} with tier ${tier}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching services.' });
    }
});
router.put('/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        // Check if user is authorized based on tier
        if (req.user?.tier !== 'paid') {
            return res.status(403).json({ message: 'Access denied. You need a paid tier to edit services.' });
        }
        // Proceed with service update logic
        res.json({ message: 'Service updated successfully.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating service.' });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map