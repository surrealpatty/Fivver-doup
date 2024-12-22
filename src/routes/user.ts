import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import for authenticateToken
import { CustomAuthRequest } from '../types'; // Correct import for CustomAuthRequest

// Create a new router instance
const router = Router();

// Route to check for premium access based on user role
router.get('/premium', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  // Ensure req.user is not undefined before using it
  const user = req.user;

  // If the user is not authenticated, return a 401 Unauthorized response
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if the role exists (using optional chaining for safety)
  const userRole = user.role;

  // If the role is not found, return a 403 Forbidden response
  if (!userRole) {
    return res.status(403).json({ message: 'User role not found.' });
  }

  // Grant premium access only to users with the 'paid' role
  if (userRole === 'paid') {
    return res.status(200).json({ message: 'Premium access granted.' });
  } else {
    // If the user does not have the 'paid' role, deny access
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

// Route to fetch user data
router.get('/user', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure user is authenticated
    const user = req.user;

    // If user is not authenticated, return a 401 Unauthorized response
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Extract necessary user details (id, email, username)
    const { id, email, username } = user;

    // Return the user's profile data
    return res.status(200).json({ id, email, username });
  } catch (err) {
    // If any error occurs, pass it to the error handler
    next(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Export the routes for use in the main app
export { router as userRoutes };
