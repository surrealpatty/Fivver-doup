import { Router } from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController'; // Import service controller methods
import authMiddleware from '../middlewares/authMiddleware'; // Ensure authMiddleware is implemented

// Ensure authorizeRoles is properly exported from authMiddleware
import { authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Route for creating a service (only authenticated users can create a service)
router.post('/create', authMiddleware, createService);

// Route for getting all services or a specific user's services
router.get('/', getServices);

// Route for updating a service (only the user who created the service or an admin can update it)
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles(['user', 'admin']), // Pass roles as an array
  updateService
);

// Route for deleting a service (only the user who created the service or an admin can delete it)
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles(['user', 'admin']), // Pass roles as an array
  deleteService
);

export default router;
