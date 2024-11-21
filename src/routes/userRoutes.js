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
var authMiddleware_1 = require("../middlewares/authMiddleware"); // Named import of authenticateToken
var user_1 = require("../models/user"); // Import User model for database operations
var router = (0, express_1.Router)();
// Route for getting all users (admin or authenticated user can access it)
router.get('/users', authMiddleware_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findAll()];
            case 1:
                users = _a.sent();
                res.json(users); // Returning the list of users
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Error fetching users', error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route for creating a user
router.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, newUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                // Basic validation: Ensure required fields are provided
                if (!username || !email || !password) {
                    return [2 /*return*/, res.status(400).json({ message: 'Missing required fields' })];
                }
                return [4 /*yield*/, user_1.default.create({
                        username: username,
                        email: email,
                        password: password,
                        isPaid: false, // Default to false for new users
                    })];
            case 1:
                newUser = _b.sent();
                res.status(201).json({ message: 'User created successfully', user: newUser });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(500).json({ message: 'Error creating user', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route for updating a user (only authenticated users can update their own profile)
router.put('/users/:id', authMiddleware_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, updatedCount, updatedUser, error_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                userId = req.params.id;
                // Ensure the user ID in the request matches the authenticated user ID
                if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== userId) {
                    return [2 /*return*/, res.status(403).json({ message: 'Forbidden: You can only update your own profile' })];
                }
                return [4 /*yield*/, user_1.default.update(req.body, {
                        where: { id: userId },
                        returning: true, // Returning the updated user data
                    })];
            case 1:
                _a = _c.sent(), updatedCount = _a[0], updatedUser = _a[1];
                // Check if the user was found and updated
                if (updatedCount === 0) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.json({ message: "User ".concat(userId, " updated successfully"), user: updatedUser[0] });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                res.status(500).json({ message: 'Error updating user', error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route for deleting a user (only authenticated users can delete their own profile)
router.delete('/users/:id', authMiddleware_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, deleted, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = req.params.id;
                // Ensure the user ID in the request matches the authenticated user ID
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
                    return [2 /*return*/, res.status(403).json({ message: 'Forbidden: You can only delete your own profile' })];
                }
                return [4 /*yield*/, user_1.default.destroy({ where: { id: userId } })];
            case 1:
                deleted = _b.sent();
                // Check if the user was found and deleted
                if (!deleted) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.status(204).send(); // No content after successful deletion
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(500).json({ message: 'Error deleting user', error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
