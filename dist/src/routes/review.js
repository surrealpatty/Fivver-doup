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
const _authMiddleware = require("../middlewares/authMiddleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Example route to create a new review
router.post('/', _authMiddleware.authenticateToken, (req, res, next)=>{
    // Your review creation logic
    res.status(201).json({
        message: 'Review created successfully.'
    });
});
// Example route to get reviews for a service
router.get('/:serviceId', _authMiddleware.authenticateToken, (req, res, next)=>{
    // Logic to fetch reviews for the service
    res.status(200).json({
        message: 'Reviews fetched successfully.'
    });
});
// Update review route
router.put('/:reviewId', _authMiddleware.authenticateToken, (req, res, next)=>{
    // Logic to update review
    res.status(200).json({
        message: 'Review updated successfully.'
    });
});
// Delete review route
router.delete('/:reviewId', _authMiddleware.authenticateToken, (req, res, next)=>{
    // Logic to delete review
    res.status(200).json({
        message: 'Review deleted successfully.'
    });
});
const _default = router;

//# sourceMappingURL=review.js.map