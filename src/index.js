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
exports.server = exports.app = void 0;
var express_1 = require("express"); // Correct TypeScript import
var user_js_1 = require("./routes/user.js"); // Correct .js extension for ESM
var authMiddleware_js_1 = require("./middlewares/authMiddleware.js"); // Correct import for ESM
var app = (0, express_1.default)();
exports.app = app;
// Middleware to parse incoming JSON requests (no need for body-parser)
app.use(express_1.default.json()); // Express built-in JSON parser
// Public routes (no authentication required)
app.use('/users', user_js_1.default); // Routes for user-related actions like register, login, etc.
// Protected routes (require authentication)
app.use('/profile', authMiddleware_js_1.authenticateToken, function (req, res) {
    res.json({ message: 'Profile page (authentication required)' });
});
// Example of a specific protected route for fetching user profile
app.use('/users/profile', authMiddleware_js_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    var _a;
    return __generator(this, function (_b) {
        try {
            userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return [2 /*return*/, res.status(400).json({ message: 'User ID is missing or invalid' })];
            }
            // Your logic to fetch and return the user profile data
            res.json({ message: "User profile data for user with ID: ".concat(userId) });
        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); });
// 404 route for undefined routes
app.use(function (req, res) {
    res.status(404).json({ message: 'Route not found' });
});
// Global error handler for unhandled errors in the application
app.use(function (err, req, res, next) {
    console.error('Global error handler:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
// Start the server
var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
exports.server = server;