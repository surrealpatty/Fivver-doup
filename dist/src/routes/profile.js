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
const _services = /*#__PURE__*/ _interop_require_default(require("@models/services"));
const _user = require("@models/user");
const _authenticateToken = require("../middlewares/authenticateToken");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Profile route to get the user's info and their services
router.get('/profile', _authenticateToken.authenticateToken, async (req, res, next)=>{
    const userId = req.user?.id; // Get user ID from the authenticated token
    if (!userId) {
        res.status(400).json({
            message: 'User ID not found in token'
        });
        return;
    }
    try {
        // Fetch the user information and their services
        const user = await _user.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        const services = await _services.default.findAll({
            where: {
                userId
            }
        });
        res.status(200).json({
            message: 'User profile retrieved successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            services
        });
    } catch (err) {
        console.error(err);
        next(err); // Pass error to the next middleware (error handler)
    }
});
// Profile update route to allow users to update their profile information
router.put('/profile', _authenticateToken.authenticateToken, async (req, res, next)=>{
    const userId = req.user?.id; // Get user ID from the authenticated token
    if (!userId) {
        res.status(400).json({
            message: 'User ID not found in token'
        });
        return;
    }
    const { username, email } = req.body; // You can add other fields as needed
    try {
        // Find the user by ID and update their details
        const user = await _user.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        // Update user details
        if (username) user.username = username;
        if (email) user.email = email;
        await user.save();
        res.status(200).json({
            message: 'User profile updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        next(err); // Pass error to the next middleware (error handler)
    }
});
const _default = router;

//# sourceMappingURL=profile.js.map