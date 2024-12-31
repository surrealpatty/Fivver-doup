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
    // Extract the token from the Authorization header
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(' ')[1]; // Extract the token after "Bearer"
    // If no token is provided, return a 401 Unauthorized response
    if (!token) {
        res.status(401).json({
            message: 'Access token is missing'
        });
        return; // Ensure no further code is executed
    }
    // Ensure the JWT_SECRET environment variable is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        res.status(500).json({
            message: 'JWT_SECRET is not defined in the environment'
        });
        return; // Ensure no further code is executed
    }
    try {
        // Verify the token using the JWT secret
        const decoded = _jsonwebtoken.default.verify(token, jwtSecret);
        // Attach the decoded user payload to the request object (with null checks)
        req.user = {
            id: decoded.id,
            email: decoded.email ?? '',
            username: decoded.username ?? ''
        };
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        res.status(401).json({
            message: 'Invalid or expired token'
        }); // Return 401 instead of 403
    }
};

//# sourceMappingURL=authenticateToken.js.map