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
const _authenticateToken = require("../middlewares/authenticateToken");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// GET /review - Example route to fetch a review
router.get('/review', _authenticateToken.authenticateToken, async (req, res, next)=>{
    try {
        const user = req.user; // Get the user from the request
        // If user is not authenticated, respond with a 401 error
        if (!user) {
            res.status(401).json({
                message: 'User not authenticated'
            });
            return; // Return early to ensure no further code executes
        }
        // Respond with sample review data (replace with actual logic as needed)
        res.status(200).json({
            message: 'Review fetched successfully',
            review: {
                userId: user.id,
                content: 'This is a sample review.'
            }
        });
    } catch (error) {
        next(error); // Pass error to the global error handler
    }
});
const _default = router;
