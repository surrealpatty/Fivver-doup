"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default" // Correct default export for the router
, {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authMiddleware = require("../middlewares/authMiddleware");
const _services = /*#__PURE__*/ _interop_require_default(require("@models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// GET route for retrieving user profile and associated services
router.get('/profile', _authMiddleware.authenticateJWT, async (req, res, next)=>{
    try {
        const user = req.user; // req.user comes from the authenticateJWT middleware
        // Check if the user exists
        if (!user) {
            res.status(403).json({
                message: 'User not authenticated'
            });
            return;
        }
        // Fetch the services associated with the user from the database
        const services = await _services.default.findAll({
            where: {
                userId: user.id
            }
        });
        // Respond with the user data and the user's services
        res.status(200).json({
            user,
            services
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        next(error); // Pass the error to the next error handler
    }
});
const _default = router;

//# sourceMappingURL=profile.js.map