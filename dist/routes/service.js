"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import JWT authentication middleware
const services_1 = __importDefault(require("../models/services")); // Correct default import
const tierMiddleware_1 = require("../middlewares/tierMiddleware"); // Import tier check middleware
const router = express_1.default.Router();
// Route to edit a service (PUT /service/:id)
router.put('/:id', authMiddleware_1.authenticateJWT, (0, tierMiddleware_1.checkTier)('paid'), async (req, res) => {
    try {
        const serviceId = req.params.id; // Get the service ID from the URL params
        const userId = req.user?.id; // Get the user ID from the authenticated JWT user
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        // Fetch the service to update from the database
        const service = await services_1.default.findOne({ where: { id: serviceId, userId } });
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }
        // Update the service with the provided data in the request body
        await service.update(req.body);
        return res.status(200).json({
            message: 'Service updated successfully',
            service, // Return the updated service details
        });
    }
    catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
// Route to view all services (GET /services)
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        const services = await services_1.default.findAll(); // Fetch all services from the database
        return res.status(200).json({ services });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
// Route to create a new service (POST /services)
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
        const userId = req.user?.id;
        if (!userId || isNaN(Number(userId))) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        // Create the service in the database
        const service = await services_1.default.create({
            userId: Number(userId), // Ensure the ID is converted to a number
            title,
            description,
            price,
        });
        // Return success response with the created service
        return res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
});
// Route to delete a service (DELETE /services/:id)
router.delete('/:id', authMiddleware_1.authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const service = await services_1.default.findByPk(id); // Find the service by primary key
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }
        // Ensure the user can only delete their own services
        if (service.userId !== Number(req.user?.id)) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own services.' });
        }
        await service.destroy(); // Delete the service from the database
        return res.status(200).json({ message: 'Service deleted successfully.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map