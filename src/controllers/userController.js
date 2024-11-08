// 3. Upgrade to Paid Subscription
exports.upgradeToPaid = async (req, res) => {
    const userId = req.user.id;  // Ensure user ID comes from a verified JWT token
    const durationInMonths = req.body.duration || 1; // Default to 1 month
    const { registerUser, loginUser } = require('controllers/userController')
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentDate = new Date();
        
        // Check if user is already on a "Paid" subscription and extend it
        if (user.role === 'Paid' && user.subscriptionEndDate > currentDate) {
            user.subscriptionEndDate.setMonth(user.subscriptionEndDate.getMonth() + durationInMonths);
        } else {
            // Otherwise, set new subscription period
            user.role = 'Paid';
            user.subscriptionStatus = 'Active';
            user.subscriptionStartDate = currentDate;
            user.subscriptionEndDate = new Date(currentDate);
            user.subscriptionEndDate.setMonth(currentDate.getMonth() + durationInMonths);
        }

        await user.save();

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
