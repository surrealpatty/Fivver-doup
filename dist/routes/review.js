"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController"); // Ensure correct import path
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adjust path as needed
const router = express_1.default.Router();
// Route to create a new review (requires authentication)
router.post('/', authMiddleware_1.authenticateToken, reviewController_1.createReview);
// Route to get reviews for a specific service
router.get('/:serviceId', reviewController_1.getReviewsForService);
// Route to update a review (requires authentication)
router.put('/:reviewId', authMiddleware_1.authenticateToken, reviewController_1.updateReview);
// Route to delete a review (requires authentication)
router.delete('/:reviewId', authMiddleware_1.authenticateToken, reviewController_1.deleteReview);
// Optional: Health check or confirmation route
router.get('/health', (_req, res) => {
    // Return the health check response with a message
    res.json({ message: 'Reviews route is working!' });
});
exports.default = router;
//# sourceMappingURL=review.js.map