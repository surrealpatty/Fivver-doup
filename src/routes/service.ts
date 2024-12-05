// src/routes/service.ts
import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import JWT authentication middleware
import { Service } from '../models/services'; // Correct named import
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for type safety
import { checkTier } from '../middlewares/tierMiddleware'; // Import tier check middleware

const router = express.Router();

// Route to edit a service (PUT /service/:id)
router.put('/:id', authenticateJWT, checkTier('paid'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const serviceId = req.params.id; // Get the service ID from the URL params
    const userId = req.user?.id; // Get the user ID from the authenticated JWT user

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Fetch the service to update from the database
    const service = await Service.findOne({ where: { id: serviceId, userId } });

    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    // Update the service with the provided data in the request body
    await service.update(req.body);

    return res.status(200).json({
      message: 'Service updated successfully',
      service, // Return the updated service details
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to view all services (GET /services)
router.get('/', authenticateJWT, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const services = await Service.findAll(); // Fetch all services from the database
    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to create a new service (POST /services)
router.post(
  '/',
  authenticateJWT, // Protect this route with JWT authentication
  checkTier('paid'), // Ensure the user has the required tier (e.g., 'paid')
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { title, description, price } = req.body;

      // Input validation
      if (!title || !description || price === undefined) {
        res.status(400).json({ message: 'All fields are required.' });
        return;
      }

      // Get the user ID from the JWT (from the `req.user` property)
      const userId = req.user?.id;
      if (!userId || isNaN(Number(userId))) {
        res.status(400).json({ message: 'Invalid user ID.' });
        return;
      }

      // Create the service in the database
      const service = await Service.create({
        userId: Number(userId), // Ensure the ID is converted to a number
        title,
        description,
        price,
      });

      // Return success response with the created service
      res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

// Route to delete a service (DELETE /services/:id)
router.delete('/:id', authenticateJWT, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id); // Find the service by primary key
    if (!service) {
      res.status(404).json({ message: 'Service not found.' });
      return;
    }

    // Ensure the user can only delete their own services
    if (service.userId !== Number(req.user?.id)) {
      res.status(403).json({ message: 'Forbidden: You can only delete your own services.' });
      return;
    }

    await service.destroy(); // Delete the service from the database
    res.status(200).json({ message: 'Service deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
