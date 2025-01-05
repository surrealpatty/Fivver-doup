"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.registerUser = void 0;
// src/controllers/userController.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Import the User model
// Controller for User Registration (Signup)
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = await user_1.default.findOne({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcryptjs_1.default.hash(password, 10); // Salt rounds = 10
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: 'user', // Default role (can be modified)
            tier: 'free', // Default tier should be "free"
            isVerified: false, // Assuming user isn't verified initially
        };
        const user = await user_1.default.create(newUser); // Pass newUser as the object to create
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT (use environment variable)
        { expiresIn: '1h' } // Expiry time of the token
        );
        // Send back response with token
        return res.status(201).json({
            message: 'User registered successfully',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.registerUser = registerUser;
// Controller for fetching user profile
const getUserProfile = async (req, res) => {
    try {
        const user = req.user; // User should be added to the request object by the authenticateToken middleware
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        return res.status(200).json({
            message: 'Profile fetched successfully',
            user: {
                id: user.id,
                email: user.email || 'No email provided',
                username: user.username || 'Anonymous',
                tier: user.tier || 'Free', // Fallback to 'Free' if no tier provided
            },
        });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getUserProfile = getUserProfile;
