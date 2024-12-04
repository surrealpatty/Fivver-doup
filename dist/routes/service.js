"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adjust path as needed
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
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // Retrieve the user ID from the authenticated token
        const userId = parseInt(req.user?.id || '', 10); // req.user is now typed as UserPayload
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        // Create a new service entry
        const service = await services_1.default.create({
            userId,
            title,
            description,
            price,
        });
        // Respond with the created service
        return res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map