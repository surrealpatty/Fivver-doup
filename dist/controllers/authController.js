"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
// Import the library to generate unique IDs (assuming you're using uuid)
const uuid_1 = require("uuid");
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        // Check if user already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user with default 'isVerified' set to false
        const user = await user_1.User.create({
            id: (0, uuid_1.v4)(), // Generate a unique ID
            email,
            username,
            password: hashedPassword, // Use hashedPassword
            role: '', // Set role to an empty string by default (if not defined)
            tier: '', // Set tier to an empty string by default (if not defined)
            isVerified: false,
        });
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
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        // Check if user exists
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the password with the hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your-default-secret', // Default secret if not set
        { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map