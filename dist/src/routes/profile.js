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
        // Access the user property with correct typing from CustomAuthRequest
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: 'User not authenticated'
            });
        }
        return res.status(200).json({
            message: 'Profile fetched successfully',
            user: {
                id: user.id,
                email: user.email || 'No email provided',
                username: user.username || 'Anonymous',
                tier: user.tier || 'Free'
            }
        });
    } catch (error) {
        next(error); // Pass error to global error handler
        // If needed, return a response here as a fallback for errors
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});
const _default = router;
