"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Ensure consistent import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
// User Registration
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Input validation
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        // Check if user already exists by email
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user with default role and tier
        const user = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role: 'free', // Add default role
            tier: 'free', // Add default tier
        });
        // Send success response with user data (excluding password for security)
        return res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, email: user.email, username: user.username },
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Server error during user registration' });
    }
};
exports.registerUser = registerUser;
// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        // Check if the user exists by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the password with the hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate a JWT token (use environment variable for secret key)
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your-default-secret', // Use a default secret if not set
        { expiresIn: '1h' } // Token expiration time
        );
        // Send the token in the response
        return res.status(200).json({
            message: 'Login successful',
            token, // Send JWT token to the user
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
};
exports.loginUser = loginUser;
