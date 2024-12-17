import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user'; // Import the User model

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await user.update({ password: hashedPassword });

        return res.status(200).json({ message: 'Password reset successful.' });
    } catch (error: unknown) {
        // Type the error as any to safely access properties
        if (error instanceof Error) {
            console.error('Error resetting password:', error.message);
            return res.status(500).json({ message: 'Server error during password reset.', error: error.message });
        } else {
            console.error('Unknown error during password reset:', error);
            return res.status(500).json({ message: 'Unknown server error' });
        }
    }
};
