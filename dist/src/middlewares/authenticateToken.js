// src/middlewares/authenticateToken.ts
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
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extract the token from the "Authorization" header
    if (!token) {
        return res.status(401).json({
            message: 'Access token is missing.'
        });
    }
    try {
        // Verify the token
        const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY || 'your-secret-key');
        // Attach the decoded user payload to the request
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({
            message: 'Invalid or expired token.'
        });
    }
};
