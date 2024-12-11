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
    try {
        // Pass the entire req and res objects to getProfile
        return await (0, profileController_1.getProfile)(req, res);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to update profile
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    try {
        // Pass the entire req and res objects to updateProfile
        return await (0, profileController_1.updateProfile)(req, res);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map