import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware'; // Named import of authenticateToken
import User from '../models/user'; // Import User model for database operations

const router = Router();

// Route for getting all users (admin or authenticated user can access it)
router.get('/users', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Assuming the authenticated user is an admin, or you can add a check for role-based access
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users); // Returning the list of users
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
});

// Route for creating a user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation: Ensure required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the new user
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
});

// Route for updating a user (only authenticated users can update their own profile)
router.put('/users/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    
    // Ensure the user ID in the request matches the authenticated user ID
    if (req.user?.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }

    // Update user details based on userId (use Sequelize's update method)
    const [updatedCount, updatedUser] = await User.update(req.body, {
      where: { id: userId },
      returning: true, // Returning the updated user data
    });

    // Check if the user was found and updated
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `User ${userId} updated successfully`, user: updatedUser[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
});

// Route for deleting a user (only authenticated users can delete their own profile)
router.delete('/users/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Ensure the user ID in the request matches the authenticated user ID
    if (req.user?.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
    }

    // Delete the user based on userId
    const deleted = await User.destroy({ where: { id: userId } });

    // Check if the user was found and deleted
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send(); // No content after successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
});

export default router;
