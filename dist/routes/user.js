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
// src/routes/user.ts
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user")); // Import User model and UserAttributes type
const express_validator_1 = require("express-validator"); // For validation
const router = (0, express_1.Router)();
// Route for user registration
router.post('/register', 
// Validate and sanitize inputs using express-validator
(0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), (0, express_validator_1.body)('firstName').isString().notEmpty().withMessage('First name is required'), (0, express_validator_1.body)('lastName').isString().notEmpty().withMessage('Last name is required'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // Check if the user already exists by username or email
        const existingUser = yield user_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const existingEmail = yield user_1.default.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }
        // Hash the password before saving it to the database
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the new user with default role and subscription status
        const user = yield user_1.default.create({
            username,
            email,
            password: hashedPassword, // Store hashed password
            firstName,
            lastName,
            role: 'Free', // Default role
            subscriptionStatus: 'Inactive', // Default subscription status
        }); // Omit the fields Sequelize auto-handles
        // Respond with the created user details, excluding password
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
        // Handle error with proper type
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map