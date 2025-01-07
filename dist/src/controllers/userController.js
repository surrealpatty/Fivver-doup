"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.registerUser = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
// Controller for registering a new user
const registerUser = async (req, res) => {
    const { email, username, password, tier = 'free', role = 'user' } = req.body;
    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    try {
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            tier,
            role,
            isVerified: false,
        });
        const token = (0, jwt_1.generateToken)(newUser);
        // Exclude password from user data response
        const { password: _, ...userData } = newUser;
        return res.status(201).json({
            message: 'User registered successfully',
            user: userData,
            token,
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: 'Internal server error during registration.',
            error: error instanceof Error ? error.message : 'Unexpected error',
        });
    }
};
exports.registerUser = registerUser;
// Example function to get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await user_1.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Exclude sensitive data like password
        const { password: _, ...userData } = user;
        return res.status(200).json(userData);
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching user.',
            error: error instanceof Error ? error.message : 'Unexpected error',
        });
    }
};
exports.getUserById = getUserById;
