import express from 'express';
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new service (requires authentication)
router.post('/', authMiddleware, createService);

// Route to get all services
router.get('/', getServices);

// Route to update a service (requires authentication)
router.put('/:serviceId', authMiddleware, updateService);

// Route to delete a service (requires authentication)
router.delete('/:serviceId', authMiddleware, deleteService);

export default router;
