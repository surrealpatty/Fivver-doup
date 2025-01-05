"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Correct way to import default exports
const uuid_1 = require("uuid"); // UUID for generating unique user ID
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// User registration handler
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Input validation
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        // Check if user already exists
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user 
        const user = await user_1.default.create({
            id: (0, uuid_1.v4)(), // Use UUID for unique user ID
            email,
            username,
            password: hashedPassword,
            role: 'user', // Default role (can be customized)
            tier: 'free', // Default tier is "free"
            isVerified: false, // User is not verified initially
        });
        // Generate JWT token after user registration
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username, tier: user.tier }, SECRET_KEY, { expiresIn: '1h' });
        // Return response with user details and token
        return res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, email: user.email, username: user.username },
            token, // Send the generated token as part of the response
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Server error during user registration' });
    }
};
exports.registerUser = registerUser;
// User login handler
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        // Check if user exists
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the password with the hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username, tier: user.tier }, // Include tier in token
        SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            token, // Send the generated token as part of the response
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role, // Send role and tier as part of the response
                tier: user.tier,
            },
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
};
exports.loginUser = loginUser;
