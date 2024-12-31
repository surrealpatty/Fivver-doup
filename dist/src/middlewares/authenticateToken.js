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
    checkUserRole: function() {
        return checkUserRole;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const authenticateToken = (req, res, next)=>{
    const authorizationHeader = req.headers['authorization'];
    // Check if the Authorization header exists
    if (!authorizationHeader) {
        res.status(401).json({
            message: 'Authorization token is missing or invalid'
        });
        return; // Ensure early return to prevent further code execution
    }
    // Extract the token from the Authorization header (expected in "Bearer token" format)
    const token = authorizationHeader.split(' ')[1];
    // If no token, return error
    if (!token) {
        res.status(401).json({
            message: 'Authorization token is missing'
        });
        return; // Ensure early return
    }
    try {
        // Decode the token and ensure it's a valid UserPayload type
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY); // Assert type as UserPayload
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        });
        return; // Ensure early return in case of error
    }
};
const checkUserRole = (req, res, next)=>{
    const user = req.user; // Ensure req.user is of type UserPayload
    // Check if the user role is 'paid'
    if (user?.role !== 'paid') {
        res.status(403).json({
            message: 'Access denied. Only paid users can access this service.'
        });
        return; // Ensure early return to prevent further code execution
    }
    // If role is valid, proceed to the next middleware or handler
    next();
};

//# sourceMappingURL=authenticateToken.js.map