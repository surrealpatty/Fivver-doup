"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/review.ts
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController"); // Ensure correct import path
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adjust path as needed
const router = (0, express_1.Router)();
// Route to create a new review (requires authentication)
router.post('/', authMiddleware_1.authenticateToken, (req, res, next) => {
    // Assuming createReview function is implemented elsewhere in the controller
    (0, reviewController_1.createReview)(req, res, next);
});
// Route to get reviews for a specific service
router.get('/:serviceId', (req, res, next) => {
    // Assuming getReviewsForService function is implemented elsewhere in the controller
    (0, reviewController_1.getReviewsForService)(req, res, next);
});
// Route to update a review (requires authentication)
router.put('/:reviewId', authMiddleware_1.authenticateToken, (req, res, next) => {
    // Assuming updateReview function is implemented elsewhere in the controller
    (0, reviewController_1.updateReview)(req, res, next);
});
// Route to delete a review (requires authentication)
router.delete('/:reviewId', authMiddleware_1.authenticateToken, (req, res, next) => {
    // Assuming deleteReview function is implemented elsewhere in the controller
    (0, reviewController_1.deleteReview)(req, res, next);
});
// Optional: Health check or confirmation route
router.get('/health', (_req, res) => {
    res.json({ message: 'Reviews route is working!' });
});
exports.default = router;
//# sourceMappingURL=review.js.map