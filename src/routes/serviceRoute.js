import { Router, Request, Response } from 'express';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware'; // Ensure correct import paths
import {
    createService,
    getServices,
    updateService,
    deleteService,
} from '../controllers/serviceController'; // Ensure correct path and named exports

const router = Router();

// Route for creating a service (only authenticated users can create a service)
router.post('/create', authMiddleware, createService);

// Route for getting all services or a specific user's services
router.get('/', getServices);

// Route for updating a service (only the user who created the service or admin can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), updateService);

// Route for deleting a service (only the user who created the service or admin can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), deleteService);

export default router;
