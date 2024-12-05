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
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        // Fetch user profile using the authenticated user's ID
        const profileData = await (0, profileController_1.getUserProfile)(req.user.id); // Pass the user ID to the controller function
        // Return the profile data in the response
        res.status(200).json(profileData);
    }
    catch (error) {
        // Pass any error to the next middleware (typically an error handler)
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map