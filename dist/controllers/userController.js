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
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = yield user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_1.User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false,
        });
        const verificationToken = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
        };
        yield transporter.sendMail(mailOptions);
        return res.status(201).json({ message: 'Registration successful, please check your email for verification.' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Server error during registration.' });
    }
});
exports.registerUser = registerUser;
