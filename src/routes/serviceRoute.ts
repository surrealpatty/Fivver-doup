import { Router, Request, Response } from 'express';
import User from '../models/user'; // Ensure correct import
import authMiddleware from '../middlewares/authMiddleware'; // Ensure correct import
export interface UserRequest extends Request {
  user: { id: string; email: string; username: string; password?: string };
}

const router = Router();

// Interface for custom request object
export interface UserRequest extends Request {
  user: User;
      id: string; // Make sure this type aligns with your actual data
      email: string;
      username: string;
      password?: string;
  };



// Route for getting the user profile (only authenticated users can view it)
router.get('/profile', authMiddleware, async (req: Request & { user?: { id: string } }, res: Response) => { 
  try {
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

router.put('/profile', authMiddleware, async (req: Request & { user: UserRequest }, res: Response) => {
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
