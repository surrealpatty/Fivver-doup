// controllers/userController.js

const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    const userId = req.params.id; // Assume user ID is passed as a parameter

    try {
        const user = await User.findByPk(userId); // Get user by primary key
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude password from the response
        const { password, ...userProfile } = user.dataValues;

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUserProfile = async (req, res) => {
    const userId = req.params.id; // Assume user ID is passed as a parameter
    const { username, password } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10); // Hash new password
        }

        await user.save(); // Save changes to the database

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
