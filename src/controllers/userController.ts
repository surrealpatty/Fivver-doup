import { Request, Response } from 'express';
import { User } from '../models';  // Correct import for User model

export const upgradeToPaid = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.id;  // Ensure user ID is available from JWT or session middleware
    const durationInMonths: number = req.body.duration || 1;  // Default to 1 month if not provided

    // Validate duration
    if (durationInMonths <= 0 || !Number.isInteger(durationInMonths)) {
        return res.status(400).json({ message: 'Duration must be a positive integer' });
    }

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Fetch the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentDate = new Date();

        // If the user already has a "Paid" subscription, extend it
        if (user.role === 'Paid' && user.subscriptionEndDate instanceof Date && user.subscriptionEndDate > currentDate) {
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
        // Improved error logging for clarity
        return res.status(500).json({
            message: 'Error upgrading subscription',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
