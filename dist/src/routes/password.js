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
const _passwordController = require("../controllers/passwordController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Middleware function for password reset validation
const validatePasswordReset = (req, res, next)=>{
    // Middleware logic (e.g., validate password reset data)
    if (!req.body.token || !req.body.newPassword) {
        // Send response directly here, but the return type must be void
        res.status(400).json({
            message: 'Token and new password are required.'
        });
        return; // Ensure we exit the middleware after sending the response
    }
    // If everything is good, call next()
    next();
};
// Route for password reset
router.post('/reset', validatePasswordReset, _passwordController.resetPassword);
const _default = router;
