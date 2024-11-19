import { Router, Request, Response } from 'express';
import User from '../models/user'; // Ensure correct import
import authMiddleware from '../middlewares/authMiddleware'; // Ensure correct import
import { UserRequest } from '../types'; // Or ensure the correct path

const router = Router();

// Interface for custom request object
interface UserRequest extends Request {
  user: User; // Assuming User is the type for authenticated user
}
  user?: { id: number }; // Ensure this matches the structure of the 'user' object attached by the auth middleware
}

// Route for getting the user profile (only authenticated users can view it)
router.get('/profile', authMiddleware, async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Find user by ID
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user); // Send user data as response
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for updating user profile (only authenticated users can update their profile)
router.put('/profile', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Perform update logic here, e.g., updating the user fields
    // Assuming req.body contains updated data
    const updatedUser = await user.update(req.body);

    return res.json(updatedUser); // Send updated user data as response
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

export default router;
