import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware'; // Correct middleware import
import { UserRequest } from '../middlewares/authMiddleware'; // Ensure UserRequest is imported correctly

const router = Router();

// Route for getting all users (admin or authenticated user can access it)
router.get('/users', authMiddleware, async (req: Request, res: Response) => {
  try {
    // Logic to fetch all users, for example using an ORM like Sequelize
    // const users = await User.findAll(); // Replace with actual ORM query
    res.json({ message: 'Users fetched successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
});

// Route for creating a user
router.post('/users', async (req: Request, res: Response) => {
  try {
    // Logic to create a new user (example)
    // const newUser = await User.create(req.body); // Replace with actual creation logic
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
});

// Route for updating a user (only authenticated users can update their own profile)
router.put('/users/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    const userId = req.params.id;
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }
    // Logic to update user details based on userId (e.g., using Sequelize)
    // const updatedUser = await User.update(req.body, { where: { id: userId } });
    res.json({ message: `User ${userId} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
});

// Route for deleting a user (only authenticated users can delete their own profile)
router.delete('/users/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    const userId = req.params.id;
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
    }
    // Logic to delete the user (e.g., using Sequelize)
    // await User.destroy({ where: { id: userId } });
    res.status(204).send(); // No content after successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
});

export default router;
