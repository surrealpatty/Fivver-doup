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
// GET /profile - Fetch profile information
router.get('/profile', _authenticateToken.authenticateToken, async (req, res, next)=>{
    try {
        const user = req.user;
        if (!user) {
            // Ensure we just send the response without returning it
            res.status(401).json({
                message: 'User not authenticated'
            });
            return; // Return early to ensure no further code executes
        }
        // Send response without returning anything
        res.status(200).json({
            message: 'Profile fetched successfully',
            user: {
                id: user.id,
                email: user.email || 'No email provided',
                username: user.username || 'Anonymous',
                tier: user.tier || 'Free'
            }
        });
    // No need to return anything from here, ensure code doesn't continue after sending response
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
});
const _default = router;
