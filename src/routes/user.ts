import { Router, Request, Response, NextFunction } from 'express';
import { CustomAuthRequest, UserPayload } from '../types';  // Import UserPayload and CustomAuthRequest
import authenticateToken from '../middlewares/authenticateToken';  // Correct import for authentication middleware
import { registerUser } from '../controllers/userController';  // Import the registerUser function

const router = Router();

// Type guard to ensure user has a valid email
function hasValidEmail(user: any): user is UserPayload {
  return typeof user.email === 'string';  // Check if email exists and is a string
}

// Route to register a new user
router.post('/register', registerUser);  // Register user route

// Define a route to access premium content, requiring authentication
router.get('/premium', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  const user = req.user;  // Get the authenticated user from the request

  // Check if user exists
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Type guard to ensure the user has a valid email
  if (!hasValidEmail(user)) {
    return res.status(400).json({ message: 'Email is missing or invalid for the user.' });
  }

  // Proceed with the role-based logic (assuming 'role' is part of UserPayload)
  const userRole = user.role;
  if (!userRole) {
    return res.status(403).json({ message: 'User role not found.' });
  }

  // Grant or deny access based on the user's role
  if (userRole === 'paid') {
    return res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

// Optional: You can add additional routes for user-related actions here (e.g., profile, settings, etc.)

export default router;  // Export the router for use in the app
