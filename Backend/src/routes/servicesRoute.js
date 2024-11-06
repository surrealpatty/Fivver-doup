import express from 'express';
import {
    createService,
    getServices,
    updateService,
    deleteService
} from '../controllers/serviceController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Ensure this path is correct

const router = express.Router();

// Route to create a new service (requires authentication)
router.post('/', authMiddleware, createService);

// Route to get all services
router.get('/', getServices);

// Route to update a service by ID (requires authentication)
router.put('/:serviceId', authMiddleware, updateService);

// Route to delete a service by ID (requires authentication)
router.delete('/:serviceId', authMiddleware, deleteService);

// Optional: Health check or confirmation route
router.get('/health', (req, res) => {
    res.json({ message: 'Services route is working!' });
});

export default router;
