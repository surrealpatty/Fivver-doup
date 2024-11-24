"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.userController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Adjust path if needed
// Ensure JWT_SECRET exists
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('JWT_SECRET is not set');
}
// Register and login a user based on the route
exports.userController = {
    // Register a new user
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, username, role } = req.body;
        try {
            // Validate required fields
            if (!email || !password || !username) {
                return res.status(400).json({ message: 'Please provide email, password, and username.' });
            }
            // Check if the user already exists
            const existingUser = yield user_1.default.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use.' });
            }
            // Hash the password
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            // Determine if the user is paid or not
            const isPaid = role === 'paid'; // Default to false if 'paid' is not specified
            // Create a new user in the database
            const newUser = yield user_1.default.create({
                email,
                password: hashedPassword,
                username,
                role: isPaid ? 'paid' : 'free', // Ensure role is correctly assigned
            });
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, username: newUser.username }, jwtSecret, { expiresIn: '1h' });
            // Return user info and token
            return res.status(201).json({
                message: 'User registered successfully.',
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                    isPaid: newUser.role === 'paid', // Use the 'role' to compute 'isPaid'
                },
            });
        }
        catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Server error during user registration.' });
        }
    }),
    // Login an existing user
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Validate incoming data
            if (!email || !password) {
                return res.status(400).json({ message: 'Please provide email and password.' });
            }
            // Find the user by email
            const user = yield user_1.default.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'User not found.' });
            }
            // Compare the password with the stored hash
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' });
            // Return the token and user info
            return res.status(200).json({
                message: 'Login successful.',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isPaid: user.role === 'paid', // Use the 'role' to compute 'isPaid'
                },
            });
        }
        catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: 'Server error during user login.' });
        }
    }),
};
// Separate functions for testing purposes (optional)
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = userData;
    // This should ideally call the same logic as above for registration
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = yield user_1.default.create({
        username,
        email,
        password: hashedPassword,
        role: 'free', // Default to free user
    });
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' });
    return { token, user };
});
exports.loginUser = loginUser;
