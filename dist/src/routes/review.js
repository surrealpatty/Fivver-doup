// src/routes/review.ts
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
router.post('/', _authMiddleware.authenticateJWT, (req, res, next)=>{
    // Ensure req.user is defined and has a tier
    if (req.user && req.user.tier) {
        res.status(201).json({
            message: 'Review created successfully.'
        });
    } else {
        res.status(400).json({
            message: 'User tier is missing.'
        });
    }
});
// Example route to get reviews for a service
router.get('/:serviceId', _authMiddleware.authenticateJWT, (req, res, next)=>{
    // Ensure req.user is defined
    if (req.user) {
        res.status(200).json({
            message: 'Reviews fetched successfully.'
        });
    } else {
        res.status(400).json({
            message: 'User not authenticated.'
        });
    }
});
const _default = router;

//# sourceMappingURL=review.js.map