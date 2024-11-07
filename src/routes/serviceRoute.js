// serviceRoute.js
import express from 'express';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js'; // Make sure you're using correct imports
import {
    createService,
    getServices,
    updateService,
    deleteService
} from '../controllers/serviceController.js'; // Correct import for named exports

const router = express.Router();

// Route for creating a service (only authenticated users can create a service)
router.post('/create', authMiddleware, createService);

// Route for getting all services or a user's services
router.get('/', getServices);

// Route for updating a service (only the user who created the service can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), updateService);

// Route for deleting a service (only the user who created the service can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), deleteService);

export default router;
