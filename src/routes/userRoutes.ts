import { Router, Request, Response, RequestHandler } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
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

// Route for getting all users
router.get('/users', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await User.findAll();
    return res.json(users); // Ensure returning a response
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
} as RequestHandler); // Cast to RequestHandler

// Route for creating a user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      isPaid: false, // Default to false
    });

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
} as RequestHandler); // Cast to RequestHandler

// Route for updating a user
router.put('/users/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.params.id;

    if (req.user?.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }

    const [updatedCount, updatedUser] = await User.update(req.body, {
      where: { id: userId },
      returning: true,
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: `User ${userId} updated successfully`, user: updatedUser[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
} as RequestHandler); // Cast to RequestHandler

// Route for deleting a user
router.delete('/users/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.params.id;

    if (req.user?.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
    }

    const deleted = await User.destroy({ where: { id: userId } });

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
} as RequestHandler); // Cast to RequestHandler

export default router;
