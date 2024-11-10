"use strict";
// src/routes/user.ts
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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user")); // Import User model and its attributes type
const express_validator_1 = require("express-validator"); // For validation
const router = (0, express_1.Router)();
// User registration route
router.post('/register', (0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), (0, express_validator_1.body)('firstName').isString().notEmpty().withMessage('First name is required'), (0, express_validator_1.body)('lastName').isString().notEmpty().withMessage('Last name is required'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // Check if username already exists
        const existingUser = yield user_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Check if email already exists
        const existingEmail = yield user_1.default.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the user with required fields
        const user = yield user_1.default.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'Free', // Default role
            subscriptionStatus: 'Inactive', // Default subscription status
        });
        // Respond with the created user data
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscriptionStatus: user.subscriptionStatus,
        });
    }
    catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map