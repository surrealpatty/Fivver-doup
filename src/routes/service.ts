import { Router, Request, Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; // Correct import for authenticateToken middleware
import { CustomAuthRequest } from '../types'; // Ensure this is imported correctly

const router = Router();

// Define the route for premium service access with JWT authentication middleware
router.get('/service/premium', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  // Ensure req.user is not undefined before using it
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = req.user; // TypeScript knows that req.user is of type UserPayload

  // Ensure user exists (TypeScript type check)
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Ensure the role exists (TypeScript type check)
  const userRole = user.role;
  if (!userRole) {
    return res.status(403).json({ message: 'User role not found.' });
  }

  // Handle the role logic (assuming 'role' is either 'admin' or 'paid')
  if (userRole === 'paid') {  // Ensure 'paid' matches the actual value in UserPayload
    return res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

// Define other service-related routes here if needed

export default router;
