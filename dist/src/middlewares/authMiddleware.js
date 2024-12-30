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
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Middleware to authenticate and decode JWT token
const authenticateToken = (req, res, next)=>{
    // Extract the token from the Authorization header (Bearer token)
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"
    // If no token is provided, return a 401 Unauthorized error
    if (!token) {
        res.status(401).json({
            message: 'Token missing'
        });
        return; // Explicitly return here to stop further execution
    }
    // Verify the token using JWT secret key
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if (err) {
            res.status(403).json({
                message: 'Token is not valid'
            });
            return; // Explicitly return here to stop further execution
        }
        // Ensure the decoded token (user) matches the UserPayload interface
        req.user = user; // Attach decoded user to the req object
        // Proceed to the next middleware or route handler
        next(); // Use next to pass control to the next middleware
    });
};
const _default = authenticateToken;

//# sourceMappingURL=authMiddleware.js.map