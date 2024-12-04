"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import authenticateJWT
const tierMiddleware_1 = require("../middlewares/tierMiddleware"); // Ensure checkTier is correct
const services_1 = __importDefault(require("../models/services")); // Correct import for Service model
const router = express_1.default.Router();
// POST route to create a service
router.post('/', authMiddleware_1.authenticateJWT, // Protect this route with JWT authentication
(0, tierMiddleware_1.checkTier)('paid'), // Ensure the user has the required tier (e.g., 'paid')
async (req, res) => {
    try {
        const { title, description, price } = req.body;
        // Input validation
        if (!title || !description || price === undefined) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // Get the user ID from the JWT (from the `req.user` property)
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        // Create the service in the database
        const service = await services_1.default.create({
            userId,
            title,
            description,
            price,
        });
        // Return success response with created service
        return res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map