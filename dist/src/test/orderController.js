"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    authenticateToken: function() {
        return authenticateToken;
    },
    checkAuth: function() {
        return checkAuth;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Ensure JWT_SECRET is available in the environment variables
const jwtSecret = process.env.JWT_SECRET; // Assert type as string
if (!jwtSecret) {
    console.error('JWT_SECRET is not set. Authentication will fail.');
}
const authenticateToken = (req, res, next)=>{
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
        if (!token) {
            res.status(401).json({
                message: 'Access denied, no token provided.'
            });
            return;
        }
        // Verify the token
        const decoded = _jsonwebtoken.default.verify(token, jwtSecret);
        // Attach the decoded payload to req.user
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Authentication error:', error.message);
            res.status(403).json({
                message: 'Invalid or expired token.'
            });
            return;
        }
        // Fallback for cases when the error is not of type `Error`
        console.error('Unexpected error during authentication:', error);
        res.status(500).json({
            message: 'Internal server error.'
        });
    }
};
const checkAuth = (req, res, next)=>{
    authenticateToken(req, res, ()=>{
        // Add any additional checks if needed
        if (req.user) {
            next(); // If authenticated, proceed to the next route handler
        } else {
            res.status(401).json({
                message: 'Authentication failed.'
            });
        }
    });
};

//# sourceMappingURL=orderController.js.map