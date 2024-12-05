"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Route handler for getting user profile
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Access the user from req.user with 'tier' correctly included
        const { id, email, username, tier } = req.user; // req.user is now typed and should have the 'tier' property
        // Respond with the user data
        res.json({ id, email, username, tier });
    }
    catch (error) {
        next(error); // Forward the error to the error handler
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map