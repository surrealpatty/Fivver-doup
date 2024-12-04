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
const _user = require("../models/user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Route to fetch the user's profile data
router.get('/', _authMiddleware.authenticateToken, async (req, res)=>{
    const userId = req.user?.id;
    if (!userId) {
        res.status(400).json({
            message: 'User ID is missing or invalid'
        });
        return;
    }
    try {
        const userProfile = await _user.User.findByPk(userId);
        if (!userProfile) {
            res.status(404).json({
                message: 'User profile not found'
            });
            return;
        }
        res.status(200).json({
            message: 'Profile data fetched successfully',
            profile: {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});
const _default = router;

//# sourceMappingURL=profile.js.map