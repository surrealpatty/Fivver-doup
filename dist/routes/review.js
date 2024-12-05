"use strict";
// src/routes/review.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import
const router = express_1.default.Router();
// Example route to create a new review
router.post('/', authMiddleware_1.authenticateJWT, (req, res, next) => {
    if (req.user && req.user.tier) {
        res.status(201).json({ message: 'Review created successfully.' });
    }
    else {
        res.status(400).json({ message: 'User tier is missing.' });
    }
});
// Example route to get reviews for a service
router.get('/:serviceId', authMiddleware_1.authenticateJWT, (req, res, next) => {
    if (req.user) {
        res.status(200).json({ message: 'Reviews fetched successfully.' });
    }
    else {
        res.status(400).json({ message: 'User not authenticated.' });
    }
});
exports.default = router;
//# sourceMappingURL=review.js.map