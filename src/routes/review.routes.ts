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
router.post('/create', authMiddleware, async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await createService(req, res);
    } catch (error) {
        console.error('Error creating service:', error.message);
        res.status(500).json({ message: 'Failed to create service' });
    }
});

// Route for getting all services or a specific user's services
router.get('/', async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await getServices(req, res);
    } catch (error) {
        console.error('Error retrieving services:', error.message);
        res.status(500).json({ message: 'Failed to retrieve services' });
    }
});

// Route for updating a service (only the user who created the service or admin can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await updateService(req, res);
    } catch (error) {
        console.error('Error updating service:', error.message);
        res.status(500).json({ message: 'Failed to update service' });
    }
});

// Route for deleting a service (only the user who created the service or admin can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await deleteService(req, res);
    } catch (error) {
        console.error('Error deleting service:', error.message);
        res.status(500).json({ message: 'Failed to delete service' });
    }
});

export default router;
