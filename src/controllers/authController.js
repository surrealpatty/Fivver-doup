"use strict";
// src/controllers/authController.ts
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
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Adjust path if needed
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('JWT_SECRET is not set');
}
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Default to 'free' if role is not provided
        const userRole = role === 'paid' ? 'paid' : 'free';
        // Create a new user in the database (id is auto-generated)
        const newUser = yield user_1.default.create({
            email,
            password: hashedPassword,
            username,
            role: userRole, // Ensure role is correctly assigned
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
                isPaid: newUser.role === 'paid', // Access the 'role' value to determine if paid
            },
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error during user registration.' });
    }
});
exports.registerUser = registerUser;
