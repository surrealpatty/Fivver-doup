import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the middleware
import { CustomAuthRequest } from '../types'; // Ensure correct typing for req.user

const router = Router();

// POST /service - Create a new service
router.post('/service', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure user is authenticated
    const user = (req as CustomAuthRequest).user;
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = user; // Extract user id for creating the service
    const { serviceName, description, price } = req.body;

    // Validate required fields
    if (!serviceName || !description || !price) {
      return res.status(400).json({ message: 'Service name, description, and price are required' });
    }

    // Ensure price is a valid number
    if (isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }

    // Logic to save the service (e.g., save to the database)
    const service = {
      userId: id,
      serviceName,
      description,
      price,
    };

    // Assuming you would save the service to the database here (e.g., using Sequelize)
    // Example (this line should be replaced with actual database logic):
    // await Service.create(service);

    // Return success response
    return res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
