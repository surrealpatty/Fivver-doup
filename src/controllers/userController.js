const { User } = require('../models'); // Ensure the path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Exclude password and return the user details
        const { password: _, ...userWithoutPassword } = newUser.toJSON();
        return res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// 2. User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

// 3. Get User Profile
exports.getUserProfile = async (req, res) => {
    const userId = req.user.id; // Assumes `authMiddleware` attaches the user ID to `req`

    try {
        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude password and return the user profile
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// 4. Update User Profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id; // Assumes `authMiddleware` attaches user ID to `req`
    const { username, email, password } = req.body;

    // Validate input fields for at least one field being updated
    if (!username && !email && !password) {
        return res.status(400).json({ message: 'At least one field (username, email, or password) must be provided' });
    }

    try {
        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the updates
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 10); // Hash new password if provided

        // Update the user in the database
        await user.update(updates);

        return res.status(200).json({ message: 'User profile updated successfully', user: updates });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

// 5. Delete User
exports.deleteUser = async (req, res) => {
    const userId = req.user.id; // Assumes `authMiddleware` attaches user ID to `req`

    try {
        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user from the database
        await user.destroy();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
