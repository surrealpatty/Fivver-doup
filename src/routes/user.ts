import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Assuming you have this middleware

const router = Router();

// Update user route
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    
    // Your update logic here (e.g., finding the user by id and updating)
    // Example: const updatedUser = await User.update({ username, email }, { where: { id } });

    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete user route
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Your delete logic here (e.g., finding and deleting the user)
    // Example: const deletedUser = await User.destroy({ where: { id } });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

export default router;
