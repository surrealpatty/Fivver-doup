import { Request, Response } from 'express';
import User from '../models/user';
import { Op } from 'sequelize'; // Import Op for Sequelize operators
import { sendResetEmail } from '../services/emailService'; // Assume you have a service to send emails

// Request password reset
export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token (this should be unique and securely generated)
    const token = 'someGeneratedToken'; // Replace this with real token generation logic
    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = new Date(Date.now() + 3600000); // Set token expiry to 1 hour
    await user.save();

    // Send the reset email (implement the sendResetEmail function to send actual emails)
    await sendResetEmail(email, token);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by the token and check if the token is not expired
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiry: { [Op.gt]: new Date() }, // Token should be valid and not expired
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the password
    user.password = newPassword;
    user.passwordResetToken = null; // Clear the token after use
    user.passwordResetTokenExpiry = null; // Clear the expiry date
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
