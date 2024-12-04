"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authMiddleware_1 = require("../middlewares/authMiddleware"); // Corrected import
var router = express_1.default.Router();
// Example route to create a new review
router.post('/', authMiddleware_1.authenticateJWT, function (req, res, next) {
    // Your review creation logic
    res.status(201).json({ message: 'Review created successfully.' });
});
// Example route to get reviews for a service
router.get('/:serviceId', authMiddleware_1.authenticateJWT, function (req, res, next) {
    // Logic to fetch reviews for the service
    res.status(200).json({ message: 'Reviews fetched successfully.' });
});
// Update review route
router.put('/:reviewId', authMiddleware_1.authenticateJWT, function (req, res, next) {
    // Logic to update review
    res.status(200).json({ message: 'Review updated successfully.' });
});
// Delete review route
router.delete('/:reviewId', authMiddleware_1.authenticateJWT, function (req, res, next) {
    // Logic to delete review
    res.status(200).json({ message: 'Review deleted successfully.' });
});
exports.default = router;
