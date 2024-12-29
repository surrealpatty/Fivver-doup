import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { User } from '../models/user';

const router = Router();

// Update user route
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const userToUpdate = await User.findByPk(id);
        if (!userToUpdate) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (username) userToUpdate.username = username;
        if (email) userToUpdate.email = email;

        await userToUpdate.save();
        res.status(200).json({ message: 'User updated successfully', user: userToUpdate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred while updating user' });
        }
    }
});

// Delete user route
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await userToDelete.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred while deleting user' });
        }
    }
});

const userRouter = 'user-router';
export default userRouter;
