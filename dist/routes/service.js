import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the middleware
const router = Router();
// Handler to check user role for premium service access
const premiumServiceHandler = (req, res) => {
    // Ensure user is authenticated and check their role
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    // Check if the user has the 'paid' role
    if (user.role === 'free') {
        return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    }
    // If the user has a 'paid' role, grant access to premium service
    return res.status(200).json({ message: 'Premium service access granted.' });
};
// POST /service - Create a new service
router.post('/service', authenticateToken, async (req, res, next) => {
    try {
        // Ensure user is authenticated
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const { id } = user; // Extract user id for creating the service
        const { serviceName, description, price } = req.body;
        // Validate required fields
        if (!serviceName || !description || !price) {
            return res.status(400).json({ message: 'Service name, description, and price are required' });
        }
        // Ensure price is a valid number
        if (isNaN(price)) {
            return res.status(400).json({ message: 'Price must be a valid number' });
        }
        // Logic to save the service (e.g., save to the database)
        const service = {
            userId: id,
            serviceName,
            description,
            price,
        };
        // Assuming you would save the service to the database here (e.g., using Sequelize)
        // Example (this line should be replaced with actual database logic):
        // await Service.create(service);
        // Return success response
        return res.status(201).json({ message: 'Service created successfully', service });
    }
    catch (error) {
        // Return error response if something goes wrong
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// GET /premium-service - Access premium service (Role-based access)
router.get('/premium-service', authenticateToken, premiumServiceHandler);
export default router;
//# sourceMappingURL=service.js.map