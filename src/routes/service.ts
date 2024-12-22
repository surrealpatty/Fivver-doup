import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct path for authenticateToken
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest

const router = Router();

// Define the route for premium service access with JWT authentication middleware
router.get('/service/premium', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  // Ensure req.user is not undefined before using it
  const user = req.user;

  // Handle case where user is not authenticated
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Ensure the role exists (TypeScript type check)
  const userRole = user.role;

  // If the user does not have a role or the role is not 'paid', deny access
  if (!userRole) {
    return res.status(403).json({ message: 'User role not found.' });
  }

  // Handle the role logic (assuming 'role' is either 'admin' or 'paid')
  if (userRole === 'paid') {
    return res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

// Route for creating a new service (authentication required)
router.post('/service', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure user is authenticated
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = user;  // Extract user id for creating the service
    const { serviceName, description, price } = req.body;

    // Validate required fields
    if (!serviceName || !description || !price) {
      return res.status(400).json({ message: 'Service name, description, and price are required' });
    }

    // Ensure price is a number
    if (isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }

    // Logic to save the service (e.g., save to the database)
    const service = {
      userId: id,
      serviceName,
      description,
      price
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

export default router;
