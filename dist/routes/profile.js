"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
// Route to get profile
router.get('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Safely check if req.user is defined and has an id
    if (!req.user?.id) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Pass the entire req and res to getProfile function
        const userProfile = await (0, profileController_1.getProfile)(req, res); // Now passing the entire req and res
        return res.status(200).json(userProfile);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to update profile
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Safely check if req.user is defined and has an id
    if (!req.user?.id) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Pass the entire req and res to updateProfile function
        const updatedProfile = await (0, profileController_1.updateProfile)(req, res); // Now passing the entire req and res
        return res.status(200).json(updatedProfile);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map