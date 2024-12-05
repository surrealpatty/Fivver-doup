"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const userTier = req.user.tier; // Access tier from req.user
        // Your route logic, e.g., fetching services or performing actions based on the user's tier
        res.status(200).json({ message: 'Success', tier: userTier });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map