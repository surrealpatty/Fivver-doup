import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Correct import
import Service from 'models/services'; // Correct alias for Service model
import { AuthRequest } from '../types/authMiddleware'; // Correct type for request

const router = Router();

// PUT route to update a service
router.put('/services/:id', authenticateJWT, async (req: AuthRequest, res: Response): Promise<void> => {  
  try {
    const serviceId = req.params.id;
    const { title, description, price } = req.body;
    const service = await Service.findByPk(serviceId);
    
    // Check if the service exists
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return; // Make sure to return after sending the response
    }
    
    // Check if the authenticated user is the owner of the service
    if (!req.user || service.userId.toString() !== req.user.id) {
      res.status(403).json({ message: 'You can only edit your own services' });
      return; // Return after sending the response
    }
    
    // Update the service
    service.title = title;
    service.description = description;
    service.price = price;
    await service.save();
    
    // Return success response with updated service data
    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error: unknown) {  
    // Fix for the error type
    if (error instanceof Error) {  
      res.status(500).json({ message: 'Error updating service', error: error.message });
    } else {
      res.status(500).json({ message: 'Error updating service', error: 'Unknown error' });
    }
  }
});

export default router;
