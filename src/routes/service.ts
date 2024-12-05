import express, { Response, Request } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import your JWT authentication middleware
import { checkTier } from '../middlewares/tierMiddleware'; // Import the checkTier middleware to validate user tier
import Service from '../models/services'; // Import the Service model
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for type safety

const router = express.Router();

// View all services (GET /services)
router.get('/', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.findAll(); // Fetch all services from the database
    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Create a new service (POST /services)
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

      // Return success response with created service
      res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

// Edit an existing service (PUT /services/:id)
router.put('/:id', authenticateJWT, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const service = await Service.findByPk(id);

    // Check if the service exists
    if (!service) {
      res.status(404).json({ message: 'Service not found.' });
      return;
    }

    // Ensure the user can only edit their own services
    if (service.userId !== Number(req.user?.id)) {
      res.status(403).json({ message: 'Forbidden: You can only edit your own services.' });
      return;
    }

    // Update the service
    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save(); // Save the updated service

    res.status(200).json({ message: 'Service updated successfully.', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
});

// Delete a service (DELETE /services/:id)
router.delete('/:id', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
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
