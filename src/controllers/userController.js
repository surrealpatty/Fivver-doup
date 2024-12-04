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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs")); // Import bcrypt for password hashing
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jwt for generating tokens
var user_1 = require("../models/user"); // Ensure correct import path for your User model
var nodemailer_1 = __importDefault(require("nodemailer")); // Import nodemailer for sending emails
var dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
// Load environment variables
dotenv_1.default.config();
// Set up the transporter with Gmail or another mail service
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Ensure GMAIL_USER is set in your environment variables
        pass: process.env.GMAIL_PASS, // Ensure GMAIL_PASS is set in your environment variables
    },
});
// Controller function to handle user registration
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, existingUser, hashedPassword, newUser, verificationToken, verificationLink, mailOptions, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                // Validate required fields
                if (!email || !password || !username) {
                    return [2 /*return*/, res.status(400).json({ message: 'All fields are required' })];
                }
                return [4 /*yield*/, user_1.User.findOne({ where: { email: email } })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email already in use' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, user_1.User.create({
                        username: username,
                        email: email,
                        password: hashedPassword,
                        isVerified: false, // Set to false until the user verifies their email
                    })];
            case 4:
                newUser = _b.sent();
                verificationToken = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your environment variables
                { expiresIn: '1d' } // Token expires in 1 day
                );
                verificationLink = "".concat(process.env.BASE_URL, "/verify?token=").concat(verificationToken);
                mailOptions = {
                    from: process.env.GMAIL_USER, // Use the email from your environment variables
                    to: email,
                    subject: 'Please verify your email address',
                    html: "<p>Click <a href=\"".concat(verificationLink, "\">here</a> to verify your email address.</p>"),
                };
                // Send the verification email asynchronously
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 5:
                // Send the verification email asynchronously
                _b.sent();
                // Return response indicating success
                return [2 /*return*/, res.status(201).json({ message: 'Registration successful, please check your email for verification.' })];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({ message: 'Server error during registration.' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
// Controller function to handle user login
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                // Validate required fields
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email and password are required' })];
                }
                return [4 /*yield*/, user_1.User.findOne({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                }
                // Return login success response
                return [2 /*return*/, res.status(200).json({ message: 'Login successful', userId: user.id })];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
