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
exports.login = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Import bcrypt for password hashing
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jwt for generating tokens
const user_1 = require("../models/user"); // Ensure correct import path for your User model
const nodemailer_1 = __importDefault(require("nodemailer")); // Import nodemailer for sending emails
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
// Load environment variables
dotenv_1.default.config();
// Set up the transporter with Gmail or another mail service
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Ensure GMAIL_USER is set in your environment variables
        pass: process.env.GMAIL_PASS, // Ensure GMAIL_PASS is set in your environment variables
    },
});
// Controller function to handle user registration
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        // Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if email already exists
        const existingUser = yield user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Hash the password using bcrypt
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10); // 10 is the salt rounds
        // Create a new user with hashed password and isVerified set to false
        const newUser = yield user_1.User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false, // Set to false until the user verifies their email
        });
        // Generate a verification token using JWT
        const verificationToken = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your environment variables
        { expiresIn: '1d' } // Token expires in 1 day
        );
        // Create the verification link
        const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        // Prepare email options
        const mailOptions = {
            from: process.env.GMAIL_USER, // Use the email from your environment variables
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
        };
        // Send the verification email asynchronously
        yield transporter.sendMail(mailOptions);
        // Return response indicating success
        return res.status(201).json({ message: 'Registration successful, please check your email for verification.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error during registration.' });
    }
});
exports.registerUser = registerUser;
// Controller function to handle user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Find user by email
        const user = yield user_1.User.findOne({ where: { email } }); // Ensure this method is available
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if password is valid (Ensure validatePassword method is defined on the User model)
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password); // Use bcrypt.compare for password validation
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Return login success response
        return res.status(200).json({ message: 'Login successful', userId: user.id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
