import User from '../models/user'; // Correct import for the User model
// GET /profile - Get user profile
export const getProfile = async (req, res) => {
    const userId = req.user?.id; // Access user id from req.user
    if (!userId) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Find the user by their ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user profile details, including new fields like role and isVerified
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role, // Include the role property
            tier: user.tier, // Include the tier property
            isVerified: user.isVerified, // Include isVerified if applicable
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// PUT /profile - Update user profile
export const updateProfile = async (req, res) => {
    const userId = req.user?.id; // Access user id from req.user
    if (!userId) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    const { email, username, role, tier, isVerified } = req.body; // Get all updateable fields from the request body
    try {
        // Find the user and update their details
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update user properties if provided
        if (email) {
            user.email = email;
        }
        if (username) {
            user.username = username;
        }
        if (role) {
            user.role = role; // Update role if provided
        }
        if (tier) {
            user.tier = tier; // Update tier if provided
        }
        if (isVerified !== undefined) {
            user.isVerified = isVerified; // Update isVerified if provided
        }
        // Save the updated user object
        await user.save();
        // Return updated user profile
        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role, // Include role in the updated response
                tier: user.tier, // Include tier in the updated response
                isVerified: user.isVerified, // Include isVerified in the updated response
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
//# sourceMappingURL=profileController.js.map