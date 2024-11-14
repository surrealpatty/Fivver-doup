"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models"); // Adjust the import path if necessary
// User Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    // Input validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = await models_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' }); // Conflict error
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await models_1.User.create({ username, email, password: hashedPassword });
        // Return success message
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const user = await models_1.User.findOne({ where: { email } });
        // Check if user exists and password matches
        if (user && await bcrypt_1.default.compare(password, user.password)) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Set the JWT in a cookie
            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.status(200).json({ message: 'Login successful', token });
        }
        else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.loginUser = loginUser;
// User Logout
const logoutUser = (req, res) => {
    res.clearCookie('jwt'); // Clear the JWT cookie on logout
    return res.status(200).json({ message: 'Logout successful' }); // Return a success message
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=authController.js.map