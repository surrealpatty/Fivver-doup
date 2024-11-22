import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { authenticateToken } from '../middlewares/authMiddleware'; // Ensure this is typed correctly
import User from '../models/user';

// Define the UserPayload interface to match the expected structure of the authenticated user
interface UserPayload {
  id: string;
  username: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

const router = Router();

// Route for getting all users (accessible only for admin or authorized users)
router.get(
  '/users',
  authenticateToken, // Ensure authenticateToken is correctly typed and returns `void`
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const users = await User.findAll();
      res.json(users); // Send the user list as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
    }
  }
);

// Route for creating a user (admin only, or open depending on your logic)
router.post(
  '/users',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'Email already in use' });
        return;
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword, // Store hashed password
        isPaid: false, // Default to false
      });

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
    }
  }
);

// Route for updating a user (ensures users can only update their own profile)
router.put(
  '/users/:id',
  authenticateToken, // Ensure authenticateToken is correctly typed and returns `void`
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;

      // Check if the logged-in user is trying to update their own profile
      if (req.user?.id !== userId) {
        res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
        return;
      }

      // Hash the password if it is being updated
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const [updatedCount, updatedUsers] = await User.update(req.body, {
        where: { id: userId },
        returning: true,
      });

      if (updatedCount === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({ message: `User ${userId} updated successfully`, user: updatedUsers[0] });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
    }
  }
);

// Route for deleting a user (ensures users can only delete their own profile)
router.delete(
  '/users/:id',
  authenticateToken, // Ensure authenticateToken is correctly typed and returns `void`
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;

      // Check if the logged-in user is trying to delete their own profile
      if (req.user?.id !== userId) {
        res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
        return;
      }

      const deleted = await User.destroy({ where: { id: userId } });

      if (!deleted) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(204).send(); // No content response after deletion
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
    }
  }
);

export default router;
