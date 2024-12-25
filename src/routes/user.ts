import express, { Request, Response } from 'express';
import { registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController'; // Import controller functions

const router = express.Router(); // Initialize router

// Register route
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await registerUser({ username, email, password }); // Call registerUser function
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    }); // Handle errors
  }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password); // Call loginUser function
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    }); // Handle errors
  }
});

// Update user route
router.put('/update', async (req: Request, res: Response) => {
  try {
    const { id, username, email, password } = req.body; // Update user data from request body
    const updatedUser = await updateUser(id, { username, email, password }); // Call updateUser function
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    }); // Handle errors
  }
});

// Delete user route
router.delete('/delete', async (req: Request, res: Response) => {
  try {
    const { id } = req.body; // User ID to delete from request body
    const deletedUser = await deleteUser(id); // Call deleteUser function
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    }); // Handle errors
  }
});

// Export the router as default
export default router;
