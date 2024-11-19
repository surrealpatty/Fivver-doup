import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware'; // Ensure your middleware import is correct
import { UserRequest } from '../types'; // Ensure the UserRequest type is imported if used

const router = Router();

// Route for getting all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    // Logic to fetch users (Example)
    res.json({ message: 'Users fetched successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
});

// Route for creating a user
router.post('/users', async (req: Request, res: Response) => {
  try {
    // Logic to create a new user (Example)
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
});

// Route for updating user
router.put('/users/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    const userId = req.params.id;
    // Logic to update user details based on userId
    res.json({ message: `User ${userId} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
});

// Route for deleting a user
router.delete('/users/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    const userId = req.params.id;
    // Logic to delete the user
    res.status(204).send(); // No content after deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
});

export default router; // Ensure the router is correctly exported
