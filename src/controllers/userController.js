const User = require('../models/user'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' }); // Handle user already exists
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Respond with the created user, excluding the password
        const { password: _, ...userWithoutPassword } = newUser.toJSON();
        return res.status(201).json(userWithoutPassword); // Respond with the created user
    } catch (error) {
        console.error('Error registering user:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// 2. User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Handle invalid credentials
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Handle invalid credentials
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token }); // Respond with the token
    } catch (error) {
        console.error('Error logging in user:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

// 3. Get User Profile
exports.getUserProfile = async (req, res) => {
    const userId = req.user.id; // Assume `authMiddleware` attaches user ID to req

    try {
        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle not found
        }

        // Respond with the user profile, excluding the password
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return res.status(200).json(userWithoutPassword); // Respond with user profile
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// 4. Update User Profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id; // Assume `authMiddleware` attaches user ID to req
    const { username, email, password } = req.body;

    try {
        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle not found
        }

        // Prepare the updates
        const updates = { username, email };
        if (password) {
            updates.password = await bcrypt.hash(password, 10); // Hash new password if provided
        }

        await user.update(updates); // Update the user in the database

        return res.status(200).json({ message: 'User profile updated successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error updating user profile:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

// 5. Delete User
exports.deleteUser = async (req, res) => {
    const userId = req.user.id; // Assume `authMiddleware` attaches user ID to req

    try {
        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle not found
        }

        // Delete the user
        await user.destroy(); // Remove the user from the database

        return res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error deleting user:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
