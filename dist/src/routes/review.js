"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _reviewController = require("../controllers/reviewController");
const _authMiddleware = require("../middlewares/authMiddleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Route to create a new review (requires authentication)
router.post('/', _authMiddleware.authenticateToken, _reviewController.createReview);
// Route to get reviews for a specific service
router.get('/:serviceId', _reviewController.getReviewsForService);
// Route to update a review (requires authentication)
router.put('/:reviewId', _authMiddleware.authenticateToken, _reviewController.updateReview);
// Route to delete a review (requires authentication)
router.delete('/:reviewId', _authMiddleware.authenticateToken, _reviewController.deleteReview);
// Optional: Health check or confirmation route
router.get('/health', (_req, res)=>{
    // Return the health check response with a message
    res.json({
        message: 'Reviews route is working!'
    });
});
const _default = router;

//# sourceMappingURL=review.js.map