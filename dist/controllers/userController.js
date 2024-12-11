"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Nodemailer setup for email verification
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
const registerUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the user already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create the new user object with default values
        const newUser = await user_1.User.create({
            username,
            email,
            password: hashedPassword,
            role: 'free', // Default role
            tier: 'free', // Default tier
            isVerified: false, // Default to not verified
        });
        // Generate a JWT verification token
        const verificationToken = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' } // Token expires in 1 day
        );
        // Create the verification URL
        const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        // Email options for sending verification email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
        };
        // Send the email
        await transporter.sendMail(mailOptions);
        return res.status(201).json({ message: 'Registration successful, please check your email for verification.' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Server error during registration.' });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=userController.js.map