"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import JWT authentication middleware
const profileController_1 = require("../controllers/profileController"); // Import getUserProfile function from the controller
const router = express_1.default.Router();
// Route to view the user's profile (GET /profile)
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Check if the user is authenticated (the user ID should be available from JWT middleware)
        if (!req.user?.id) {
            // Returning response with 401 if user not authenticated
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        // Fetch user profile using the authenticated user's ID
        const profileData = await (0, profileController_1.getUserProfile)(req.user.id); // Pass the user ID to the controller function
        // Send the profile data as a response (this does not return anything)
        res.status(200).json(profileData);
        // No return value after res.status() to maintain the expected void return type
    }
    catch (error) {
        // Pass any error to the next middleware (typically an error handler)
        next(error); // Don't need to explicitly return anything from here
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map