"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user"); // Importing User, UserRole, and UserTier
const jwt_1 = require("../utils/jwt"); // Helper function to generate JWT
// Controller for registering a new user
const registerUser = async (req, res) => {
    // Destructuring input, ensuring correct types
    const { email, username, password, tier = 'free', role = 'user' } = req.body;
    // Input validation: Ensure required fields are provided
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    try {
        // Check if the user already exists by email
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }
        // Hash the user's password before saving to the database
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Default role, tier, and isVerified properties (assumed defaults)
        const newUser = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            tier, // Correctly passing the tier as UserTier type
            role, // Assign the role from the request body, ensuring it matches the UserRole type
            isVerified: false, // Default verification status
        });
        // Generate a JWT token for the new user
        const token = (0, jwt_1.generateToken)(newUser);
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
exports.registerUser = registerUser;
// Example function to get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await user_1.User.findByPk(req.params.id); // Or another method to find the user
        if (!user) {
            // Return a 404 status with the correct message
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user data (excluding sensitive data like password)
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        });
    }
    catch (error) {
        // Handle any unexpected errors
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({ message: 'Internal server error while fetching user.' });
    }
};
exports.getUserById = getUserById;
