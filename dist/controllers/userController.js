import bcrypt from 'bcryptjs';
import User from '../models/user'; // Importing the User model
import { generateToken } from '../utils/jwt'; // Helper function to generate JWT
// Controller for registering a new user
export const registerUser = async (req, res) => {
    const { email, username, password, tier = 'free' } = req.body;
    // Input validation: Ensure required fields are provided
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }
        // Hash the user's password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        // Default role, tier, and isVerified properties (assumed defaults)
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            tier, // Optional tier (defaults to 'free')
            role: 'user', // Default role
            isVerified: false, // Default verification status
        });
        // Generate a JWT token for the new user
        const token = generateToken(newUser);
        // Respond with the user data (excluding password) and the JWT token
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role, // Default role is 'user'
                tier: newUser.tier, // The user's tier (e.g., 'free')
                isVerified: newUser.isVerified,
                createdAt: newUser.createdAt,
            },
            token,
        });
    }
    catch (error) {
        // Log the error and respond with a generic server error message
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error during registration.' });
    }
};
