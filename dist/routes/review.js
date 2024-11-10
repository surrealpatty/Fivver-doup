"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_js_1 = require("../controllers/reviewController.js"); // Ensure the correct import path for your controllers
const authMiddleware_js_1 = __importDefault(require("../middlewares/authMiddleware.js")); // Correct import path for authMiddleware
const router = express_1.default.Router();
// Route to create a new review (requires authentication)
router.post('/', authMiddleware_js_1.default, reviewController_js_1.createReview);
// Route to get reviews for a specific service
router.get('/:serviceId', reviewController_js_1.getReviewsForService);
// Route to update a review (requires authentication)
router.put('/:reviewId', authMiddleware_js_1.default, reviewController_js_1.updateReview);
// Route to delete a review (requires authentication)
router.delete('/:reviewId', authMiddleware_js_1.default, reviewController_js_1.deleteReview);
// Optional: Health check or confirmation route
router.get('/health', (req, res) => {
    res.json({ message: 'Reviews route is working!' });
});
exports.default = router; // Use ES module export
//# sourceMappingURL=review.js.map