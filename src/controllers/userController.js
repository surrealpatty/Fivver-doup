import { Request, Response } from 'express';
import { User } from '../models';  // Ensure User model is correctly imported

// Upgrade to Paid Subscription
export const upgradeToPaid = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user.id;  // Ensure user ID comes from a verified JWT token
    const durationInMonths = req.body.duration || 1; // Default to 1 month
    
    try {
        // Fetch the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentDate = new Date();

        // Check if user is already on a "Paid" subscription and extend it
        if (user.role === 'Paid' && user.subscriptionEndDate > currentDate) {
            // Extend subscription period
            user.subscriptionEndDate.setMonth(user.subscriptionEndDate.getMonth() + durationInMonths);
        } else {
            // Otherwise, initiate a new "Paid" subscription
            user.role = 'Paid';
            user.subscriptionStatus = 'Active';
            user.subscriptionStartDate = currentDate;
            user.subscriptionEndDate = new Date(currentDate);
            user.subscriptionEndDate.setMonth(currentDate.getMonth() + durationInMonths);
        }

        // Save updated user details to the database
        await user.save();

        // Respond with updated subscription information
        return res.status(200).json({
            message: 'Subscription upgraded to Paid',
            subscriptionEndDate: user.subscriptionEndDate,
            subscriptionStatus: user.subscriptionStatus
        });
    } catch (error) {
        console.error('Error upgrading subscription:', error);
        return res.status(500).json({ message: 'Error upgrading subscription', error: error.message });
    }
};
