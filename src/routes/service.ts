// src/routes/service.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the middleware
import { CustomAuthRequest } from '../types'; // Ensure correct typing for req.user

const router = Router();

// POST /service - Create a new service
router.post('/service', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure user is authenticated
    const user = (req as CustomAuthRequest).user;
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = user;  // Extract user id for creating the service
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

    // Example: save the service in the database (replace with actual DB interaction)
    // await Service.create(service);

    // Return a success response with the created service data
    return res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    next(err);  // Pass errors to the error handler
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /service/:id - Retrieve a service by ID
router.get('/service/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure user is authenticated
    const user = (req as CustomAuthRequest).user;
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.params; // Extract service ID from URL params

    // Logic to retrieve the service from the database (replace with actual DB query)
    // const service = await Service.findById(id);
    const service = { id, serviceName: 'Sample Service', description: 'Sample Description', price: 100 }; // Example service

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Return the found service data
    return res.status(200).json({ message: 'Service found', service });
  } catch (err) {
    next(err);  // Pass errors to the error handler
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
