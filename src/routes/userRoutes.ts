import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware'; // Correct middleware import
import User from '../models/user'; // Import User model for database operations

const router = Router();

// Route for getting all users (admin or authenticated user can access it)
router.get('/users', authMiddleware, async (req: Request, res: Response) => {
  try {
    // Assuming the authenticated user is an admin, or you can add a check for role-based access
    const users = await User.findAll(); // Replace with actual ORM query
    res.json(users); // Returning the list of users
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
});

// Route for creating a user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body; // Make sure you validate and hash the password
    const newUser = await User.create({ username, email, password }); // Replace with actual creation logic
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
});

// Route for updating a user (only authenticated users can update their own profile)
router.put('/users/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    // Make sure the authenticated user can only update their own profile
    if (req.user?.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }

    // Update user details based on userId (e.g., using Sequelize)
    const updatedUser = await User.update(req.body, { where: { id: userId }, returning: true });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `User ${userId} updated successfully`, user: updatedUser[1][0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
});

// Route for deleting a user (only authenticated users can delete their own profile)
router.delete('/users/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    // Make sure the authenticated user can only delete their own profile
    if (req.user?.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
    }

    const deleted = await User.destroy({ where: { id: userId } });

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send(); // No content after successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
});

export default router;
