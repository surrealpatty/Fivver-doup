// src/routes/service.ts

import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Correct import
import { ServiceCreationAttributes } from '@models/services'; // Correct alias for Service model
import { User } from '@models/user'; // Correct alias for User model
import Service from '@models/services'; // Correct alias for Service model
import { AuthRequest } from '../types/authMiddleware'; // Correct type for request

const router = Router();

// PUT route to update a service
router.put('/services/:id', authenticateJWT, async (req: AuthRequest, res: Response): Promise<Response> => { // Correct return type
  try {
    const serviceId = req.params.id;
    const { title, description, price } = req.body;
    const service = await Service.findByPk(serviceId);
    
    // Check if the service exists
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if the authenticated user is the owner of the service
    if (!req.user || service.userId.toString() !== req.user.id) { // Ensure req.user exists
      return res.status(403).json({ message: 'You can only edit your own services' });
    }
    
    // Update the service
    service.title = title;
    service.description = description;
    service.price = price;
    await service.save();
    
    // Return success response with updated service data
    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

export default router;
