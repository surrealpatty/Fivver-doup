import { Router, Request, Response } from 'express';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware'; // Update paths as needed
import {
    createService,
    getServices,
    updateService,
    deleteService,
} from '../controllers/serviceController'; // Ensure correct path and named exports

const router = Router();

// Route for creating a service (only authenticated users can create a service)
router.post('/create', authMiddleware, (req: Request, res: Response) => {
    createService(req, res);
});

// Route for getting all services or a specific user's services
router.get('/', (req: Request, res: Response) => {
    getServices(req, res);
});

// Route for updating a service (only the user who created the service or admin can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), (req: Request, res: Response) => {
    updateService(req, res);
});

// Route for deleting a service (only the user who created the service or admin can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), (req: Request, res: Response) => {
    deleteService(req, res);
});

export default router;
