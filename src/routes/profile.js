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
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Ensure authenticateToken is imported
const models_1 = require("../models"); // Import the User model to fetch user data
const router = express_1.default.Router();
// Route to fetch the user's profile data
router.get('/', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Ensure the user is correctly assigned from the token middleware
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Use userId from the token
    // Check if user ID is valid
    if (!userId) {
        res.status(400).json({ message: 'User ID is missing or invalid' });
        return; // No need to return the response object, just end execution
    }
    try {
        // Fetch user profile from the database
        const userProfile = yield models_1.User.findByPk(userId);
        // If the user is not found, return a 404 response
        if (!userProfile) {
            res.status(404).json({ message: 'User profile not found' });
            return;
        }
        // Return the user profile (excluding sensitive data like password)
        res.status(200).json({
            message: 'Profile data fetched successfully',
            profile: {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email,
                // Add other relevant user fields here as needed
            },
        });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
