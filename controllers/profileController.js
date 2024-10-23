// controllers/profileController.js
const { User } = require('../models'); // Adjust the path according to your project structure

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is stored in req.user by the middleware
        const user = await User.findByPk(userId, { attributes: ['id', 'username', 'email', 'createdAt'] });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const userId = req.user.id; // Get user ID from the authenticated user

    const { username, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};
