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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user"); // Ensure correct path to your User model
var bcryptjs_1 = require("bcryptjs"); // Assuming bcrypt is used for password hashing
var jsonwebtoken_1 = require("jsonwebtoken"); // Assuming JWT is used for authentication
var router = express_1.default.Router();
// Register new user
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, role, existingUser, hashedPassword, newUser, jwtSecret, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, username = _a.username, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                // Validate the incoming data
                if (!email || !password || !username) {
                    return [2 /*return*/, res.status(400).json({ message: 'Please provide email, password, and username' })];
                }
                return [4 /*yield*/, user_1.default.findOne({ where: { email: email } })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email already in use' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, user_1.default.create({
                        email: email,
                        password: hashedPassword,
                        username: username,
                        role: role || 'user', // Default to 'user' role if not provided
                        isPaid: false, // Assuming the default user is not paid
                    })];
            case 4:
                newUser = _b.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    return [2 /*return*/, res.status(500).json({ message: 'JWT secret is not configured properly.' })];
                }
                token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, username: newUser.username }, jwtSecret, { expiresIn: '1h' } // 1 hour expiration time
                );
                // Send the response with the token
                res.status(201).json({
                    message: 'User registered successfully',
                    token: token,
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        username: newUser.username,
                    },
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error('Error registering user:', error_1);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Login user
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, jwtSecret, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                // Validate the incoming data
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json({ message: 'Please provide email and password' })];
                }
                return [4 /*yield*/, user_1.default.findOne({ where: { email: email } })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    return [2 /*return*/, res.status(500).json({ message: 'JWT secret is not configured properly.' })];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' } // 1 hour expiration time
                );
                // Send the response with the token
                res.status(200).json({
                    message: 'Login successful',
                    token: token,
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error('Error logging in user:', error_2);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
