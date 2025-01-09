import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user'; // Import the User model

// Fixed resetPassword handler
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, newPassword } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return; // Ensure no further code is executed
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await user.update({ password: hashedPassword });

        // Send a success response
        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error resetting password:', error.message);
            res.status(500).json({ message: 'Server error during password reset.', error: error.message });
        } else {
            console.error('Unknown error during password reset:', error);
            res.status(500).json({ message: 'Unknown server error' });
        }

        // Ensure the error is passed to the next middleware
        next(error);
    }
};
