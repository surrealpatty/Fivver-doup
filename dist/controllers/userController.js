"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeToPaid = void 0;
const models_1 = require("../models"); // Correct import for User model
const upgradeToPaid = async (req, res) => {
    const userId = req.user?.id; // Ensure user ID is available from JWT or session middleware
    const durationInMonths = req.body.duration || 1; // Default to 1 month if not provided
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        // Fetch the user by ID
        const user = await models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const currentDate = new Date();
        // If the user already has a "Paid" subscription, extend it
        if (user.role === 'Paid' && user.subscriptionEndDate instanceof Date && user.subscriptionEndDate > currentDate) {
            // Extend subscription period
            user.subscriptionEndDate.setMonth(user.subscriptionEndDate.getMonth() + durationInMonths);
        }
        else {
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
    }
    catch (error) {
        console.error('Error upgrading subscription:', error);
        // Improved error logging for clarity
        return res.status(500).json({
            message: 'Error upgrading subscription',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.upgradeToPaid = upgradeToPaid;
//# sourceMappingURL=userController.js.map