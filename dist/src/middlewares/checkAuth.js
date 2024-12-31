"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticateToken", {
    enumerable: true,
    get: function() {
        return authenticateToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authenticateToken = (req, res, next)=>{
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // If no token is provided, send a response and return early
        res.status(401).json({
            message: 'No token provided.'
        });
        return;
    }
    try {
        // Verify the token and decode the payload
        const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user payload to req.user
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If token verification fails, send a response and return early
        res.status(403).json({
            message: 'Invalid token.'
        });
        return;
    }
};

//# sourceMappingURL=checkAuth.js.map