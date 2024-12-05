"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import your JWT authentication middleware
const tierMiddleware_1 = require("../middlewares/tierMiddleware"); // Import the checkTier middleware to validate user tier
const services_1 = __importDefault(require("../models/services")); // Import the Service model
const router = express_1.default.Router();
// View all services (GET /services)
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        const services = await services_1.default.findAll(); // Fetch all services from the database
        res.status(200).json({ services });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// Create a new service (POST /services)
router.post('/', authMiddleware_1.authenticateJWT, // Protect this route with JWT authentication
(0, tierMiddleware_1.checkTier)('paid'), // Ensure the user has the required tier (e.g., 'paid')
async (req, res) => {
    try {
        const { title, description, price } = req.body;
        // Input validation
        if (!title || !description || price === undefined) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        // Get the user ID from the JWT (from the `req.user` property)
        const userId = req.user?.id;
        if (!userId || isNaN(Number(userId))) {
            res.status(400).json({ message: 'Invalid user ID.' });
            return;
        }
        // Create the service in the database
        const service = await services_1.default.create({
            userId: Number(userId), // Ensure the ID is converted to a number
            title,
            description,
            price,
        });
        // Return success response with created service
        res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error });
    }
});
// Delete a service (DELETE /services/:id)
router.delete('/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const service = await services_1.default.findByPk(id); // Find the service by primary key
        if (!service) {
            res.status(404).json({ message: 'Service not found.' });
            return;
        }
        // Ensure the user can only delete their own services
        if (service.userId !== Number(req.user?.id)) {
            res.status(403).json({ message: 'Forbidden: You can only delete your own services.' });
            return;
        }
        await service.destroy(); // Delete the service from the database
        res.status(200).json({ message: 'Service deleted successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map