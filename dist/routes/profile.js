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
        const { id, email, username, tier } = req.user; // Now TypeScript recognizes user with 'tier'
        res.json({ id, email, username, tier });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map