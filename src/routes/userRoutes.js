"use strict";
// src/routes/userRoutes.ts
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
var bcryptjs_1 = require("bcryptjs");
var express_validator_1 = require("express-validator");
var sequelize_1 = require("sequelize"); // Import Op for Sequelize operators
var user_1 = require("../models/user"); // Ensure this import matches your model file
var router = express_1.default.Router();
// Registration Route
router.post('/register', 
// Validation checks
(0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, username, email, password, firstName, lastName, subscriptionStatus, existingUser, hashedPassword, subscriptionStartDate, subscriptionEndDate, user, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })]; // Send error response if validation fails
                }
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, subscriptionStatus = _a.subscriptionStatus;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findOne({
                        where: (_b = {},
                            _b[sequelize_1.Op.or] = [{ username: username }, { email: email }],
                            _b)
                    })];
            case 2:
                existingUser = _c.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Username or email already taken' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _c.sent();
                subscriptionStartDate = new Date();
                subscriptionEndDate = new Date();
                subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1); // Default subscription for 1 month
                return [4 /*yield*/, user_1.default.create({
                        username: username,
                        email: email,
                        password: hashedPassword,
                        firstName: firstName, // Optional if you add this to your model
                        lastName: lastName, // Optional if you add this to your model
                        role: 'Free', // Default role
                        subscriptionStatus: subscriptionStatus || 'Inactive', // Default to 'Inactive' if not provided
                        subscriptionStartDate: subscriptionStartDate,
                        subscriptionEndDate: subscriptionEndDate
                    })];
            case 4:
                user = _c.sent();
                // Return success response
                return [2 /*return*/, res.status(201).json({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    })];
            case 5:
                error_1 = _c.sent();
                // Proper error handling with type assertion
                if (error_1 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ message: 'Server error during registration', error: error_1.message })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({ message: 'Server error during registration', error: 'Unknown error' })];
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Export the router
exports.default = router;
