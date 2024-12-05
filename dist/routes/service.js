"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import JWT authentication middleware
const tierMiddleware_1 = require("../middlewares/tierMiddleware"); // Add checkTier middleware if needed
const router = express_1.default.Router();
// Example route that uses AuthRequest and checks the tier
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const userTier = req.user.tier; // Access tier from req.user
        // Your route logic, e.g., fetching services or performing actions based on the user's tier
        res.status(200).json({ message: 'Success', tier: userTier });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Example of a route using checkTier middleware
router.put('/:id', authMiddleware_1.authenticateJWT, (0, tierMiddleware_1.checkTier)('paid'), async (req, res) => {
    // Your update logic
    res.status(200).json({ message: 'Service updated successfully' });
});
// Example of a POST route with user tier check
router.post('/', authMiddleware_1.authenticateJWT, (0, tierMiddleware_1.checkTier)('paid'), async (req, res) => {
    // Your post logic
    res.status(201).json({ message: 'Service created successfully' });
});
// Example of a DELETE route
router.delete('/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    // Your delete logic
    res.status(204).json({ message: 'Service deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=service.js.map