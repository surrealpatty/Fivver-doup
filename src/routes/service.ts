// src/routes/service.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // JWT middleware
import { Service } from '../models/service'; // Adjust the import path as needed

const serviceRouter = Router();

// PUT route for updating a service by ID
serviceRouter.put('/:id', authenticateJWT, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params; // Get service ID from the route parameter
    const { title, description, price } = req.body; // Destructure properties from request body

    // Find the service by ID
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' }); // Handle service not found
    }

    // Update the service details
    await service.update({ title, description, price });

    // Respond with the updated service
    return res.status(200).json({ message: 'Service updated successfully', service });
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

export default serviceRouter;
