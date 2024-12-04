"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // JWT authentication middleware
const tierMiddleware_1 = require("../middlewares/tierMiddleware"); // Tier-based access control middleware
const services_1 = __importDefault(require("../models/services")); // Service model
const router = express_1.default.Router();
// POST /services route to create a new service (only for paid users)
router.post('/', authMiddleware_1.authenticateToken, // Authenticate the user
(0, tierMiddleware_1.checkTier)('paid'), // Restrict route access to users with 'paid' tier
async (req, res) => {
    try {
        const { title, description, price } = req.body;
        // Validate request body
        if (!title || !description || price === undefined) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        // Retrieve the user ID from the authenticated token
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'Invalid user ID.' });
            return;
        }
        // Create a new service entry
        const service = await services_1.default.create({
            userId,
            title,
            description,
            price,
        });
        // Respond with the created service
        res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map