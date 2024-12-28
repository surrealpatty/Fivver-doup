import { Router, Request, Response } from 'express'; // Removed NextFunction import
import { authenticateToken } from '../middlewares/authenticateToken'; // Changed to default import
import { User } from '../models/user'; // Assuming you have a User model for database operations

const router = Router();

// Update user route
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // 'id' should be used for the update logic

    // Destructuring username and email from request body
    const { username, email } = req.body;

    try {
        // Find user by ID and update their data
        const userToUpdate = await User.findByPk(id); // Assuming you are using Sequelize
        if (!userToUpdate) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Update user properties if provided in the request body
        if (username) userToUpdate.username = username;
        if (email) userToUpdate.email = email;

        // Save the updated user data
        await userToUpdate.save();

        res.status(200).json({ message: 'User updated successfully', user: userToUpdate });
    } catch (error: unknown) {  // error type is 'unknown' here
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

// Delete user route
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // 'id' is used to delete the user

    try {
        // Find user by ID and delete their record
        const userToDelete = await User.findByPk(id); // Assuming you are using Sequelize
        if (!userToDelete) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Delete user
        await userToDelete.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {  // error type is 'unknown' here
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

export default router;
