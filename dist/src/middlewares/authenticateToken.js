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
    // Extract the token from the Authorization header (expected format "Bearer token")
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        // If no token is provided, send an error and stop further processing
        return res.status(401).json({
            message: 'Authorization token is missing or invalid'
        });
    }
    // Extract token from "Bearer token" format
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        // If no token after "Bearer", send an error and stop further processing
        return res.status(401).json({
            message: 'Authorization token is missing'
        });
    }
    try {
        // Decode the token and ensure it's a valid UserPayload type
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next(); // This will proceed to the next middleware or handler
    } catch (error) {
        // Token verification failed, send error and stop further processing
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};
const checkUserRole = (req, res, next)=>{
    // Ensure req.user is correctly typed as UserPayload
    const user = req.user;
    if (!user?.role) {
        // If no role is defined in the user, send an error and stop further processing
        return res.status(403).json({
            message: 'User role is missing or invalid'
        });
    }
    // Check if the user role is 'Paid'
    if (user.role !== 'Paid') {
        // If the user is not 'Paid', deny access
        return res.status(403).json({
            message: 'Access denied. Only paid users can access this service.'
        });
    }
    // If role is valid, proceed to the next middleware or handler
    next();
};
