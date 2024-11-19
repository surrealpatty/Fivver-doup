import { Router, Request, Response } from 'express';
import authMiddleware, { authorizeRoles } from '../middlewares/authMiddleware'; // Ensure correct import of both default and named exports
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController'; // Ensure correct import from the serviceController

const router = Router();

// Route for creating a service (only authenticated users can create a service)
router.post('/create', authMiddleware, createService); // Let the controller handle the response

// Route for getting all services or a specific user's services
router.get('/', getServices); // Let the controller handle the response

// Route for updating a service (only the user who created the service or an admin can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), updateService); // Let the controller handle the response

// Route for deleting a service (only the user who created the service or an admin can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), deleteService); // Let the controller handle the response

export default router;
