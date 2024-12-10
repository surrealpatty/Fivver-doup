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
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // If no token is provided, respond with 401 and stop further execution
    if (!token) {
        res.status(401).json({
            message: 'Access Denied: No token provided'
        });
        return; // Make sure to return here to stop further execution
    }
    try {
        // Decode the token
        const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
        // Attach user info to the request object
        req.user = {
            id: decoded.id,
            email: '',
            username: '',
            tier: 'free',
            role: ''
        }; // Ensure the type matches UserPayload interface
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        // If the token is invalid, respond with 401
        res.status(401).json({
            message: 'Access Denied: Invalid token'
        });
    }
};

//# sourceMappingURL=authenticateToken.js.map