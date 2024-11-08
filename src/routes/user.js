import express from 'express';
import bcrypt from 'bcryptjs';  // bcryptjs is the correct library you are using, so it's good to stick with it
import jwt from 'jsonwebtoken';
import User from '../models/user.js';  // Ensure the path is correct
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the express router
const router = express.Router();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
}

// Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;

    try {
        // Check if the user already exists (checking by both username and email)
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with default 'Free' role and 'Inactive' subscription status
        const user = await User.create({
            username,
            email,
            password: hashedPassword,  // Store the hashed password
            firstName,
            lastName,
            role: 'Free',  // Default to "Free" role
            subscriptionStatus: 'Inactive',  // Default to "Inactive"
        });

        // Respond with user details excluding password
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscriptionStatus: user.subscriptionStatus,
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Send token as response
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Example route for testing if routes are working
router.get('/', (req, res) => {
    res.send('User route is active');
});

// Export the router for use in the main app
export default router;
