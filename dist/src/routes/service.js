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
// Example middleware to check user roles
const checkRole = (role)=>{
    return (req, res, next)=>{
        const user = req.user; // Type the user as UserPayload
        const userRole = user.role; // Now TypeScript knows that user has a 'role' property
        if (userRole !== role) {
            return res.status(403).json({
                message: 'Access denied. Only paid users can access this service.'
            });
        }
        next();
    };
};
// Premium service route for paid users only
router.get('/premium', _authenticateToken.authenticateToken, checkRole('Paid'), (req, res)=>{
    res.status(200).json({
        message: 'Premium service access granted.'
    });
});
const _default = router;
