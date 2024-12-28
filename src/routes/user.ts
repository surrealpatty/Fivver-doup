import { Router, Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; // Default import

const router = Router();

// Update user route
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Destructuring id from request params
    const { username, email } = req.body; // Destructuring username and email from request body
    
    // Example: Your update logic here
    // const updatedUser = await User.update({ username, email }, { where: { id } });

    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete user route
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Destructuring id from request params

    // Example: Your delete logic here
    // const deletedUser = await User.destroy({ where: { id } });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

export default router;
