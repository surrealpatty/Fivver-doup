/// <reference path="../types/express.d.ts" />  // Explicitly reference the custom types file (only if needed)
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
    },
    default: function() {
        return _default;
    },
    generateToken: function() {
        return generateToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const jwtSecret = process.env.JWT_SECRET;
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
            return; // Explicit return to satisfy TypeScript's void requirement
        }
        // Verify the token
        _jsonwebtoken.default.verify(token, jwtSecret, (err, decoded)=>{
            if (err) {
                res.status(403).json({
                    message: 'Invalid or expired token.'
                });
                return; // Explicit return to end execution
            }
            // Attach the decoded payload to req.user
            req.user = decoded; // Ensure 'user' is typed as UserPayload
            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            message: 'Internal server error during authentication.'
        });
        return; // Explicit return to end execution
    }
};
const checkAuth = (req, res, next)=>{
    authenticateToken(req, res, ()=>{
        // Additional checks can be added here if needed (e.g., check if user is active)
        if (req.user) {
            next(); // If authenticated, proceed to the next route handler
        } else {
            res.status(401).json({
                message: 'Authentication failed.'
            });
        }
    });
};
const generateToken = (user)=>{
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username // Include username in the token
    };
    return _jsonwebtoken.default.sign(payload, jwtSecret, {
        expiresIn: '1h'
    }); // You can modify expiration as needed
};
const _default = authenticateToken;

//# sourceMappingURL=authMiddleware.js.map