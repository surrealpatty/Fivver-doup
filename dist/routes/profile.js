"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/profile.ts
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
// Route to get profile
router.get('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    if (!req.user?.id) { // Use optional chaining here
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Call getProfile with both req and res (to match the function signature)
        await (0, profileController_1.getProfile)(req, res); // Ensure getProfile expects (req, res)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    // The response will be handled in getProfile
    return res; // Ensure you don't return here before the profile data is returned from getProfile
});
// Route to update profile
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    if (!req.user?.id) { // Use optional chaining here
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Call updateProfile with both req and res (to match the function signature)
        await (0, profileController_1.updateProfile)(req, res); // Ensure updateProfile expects (req, res)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    // The response will be handled in updateProfile
    return res; // Ensure you don't return here before the updated profile is returned from updateProfile
});
exports.default = router;
//# sourceMappingURL=profile.js.map