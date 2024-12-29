import { Router, Request, Response } from 'express'; 
import { authenticateToken } from '../middlewares/authenticateToken'; // Ensure token validation is correctly imported
import { User } from '../models/user'; // User model for DB operations

const router = Router();

// Update user route
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Get the user ID from URL parameters
    const { username, email } = req.body; // Get the username and email from the request body

    try {
        // Find user by ID from the database using Sequelize's findByPk method
        const userToUpdate = await User.findByPk(id); 
        if (!userToUpdate) {
            // If user is not found, return a 404 status with an appropriate message
            return res.status(404).json({ message: 'User not found' });
        }

        // If username is provided, update it; similarly for email
        if (username) userToUpdate.username = username;
        if (email) userToUpdate.email = email;

        // Save the updated user back to the database
        await userToUpdate.save();
        // Respond with a success message and the updated user data
        res.status(200).json({ message: 'User updated successfully', user: userToUpdate });
    } catch (error: unknown) {
        // If an error occurs, handle it gracefully and provide the error message
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred while updating user' });
        }
    }
});

// Delete user route
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Get the user ID from URL parameters

    try {
        // Find user by ID from the database using Sequelize's findByPk method
        const userToDelete = await User.findByPk(id); 
        if (!userToDelete) {
            // If user is not found, return a 404 status with an appropriate message
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is found, delete the user from the database
        await userToDelete.destroy();
        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {
        // If an error occurs, handle it gracefully and provide the error message
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred while deleting user' });
        }
    }
});

export default router;
