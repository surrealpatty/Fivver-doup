"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import JWT authentication middleware
const profileController_1 = require("../controllers/profileController"); // Assuming you have a profileController to fetch user profile
const router = express_1.default.Router();
// Route to view the user's profile (GET /profile)
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const profileData = await (0, profileController_1.getUserProfile)(req.user.id); // Ensure req.user is available and has 'id'
        res.status(200).json(profileData);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map