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
// Define the secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const authenticateToken = (req, res, next)=>{
    // Extract the token from the Authorization header (Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // Log missing token for debugging purposes
        console.log('Authorization token is missing');
        return res.status(401).json({
            message: 'Authorization token is missing'
        });
    }
    try {
        // Verify and decode the token
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Log the decoded token for debugging purposes
        console.log('Decoded token:', decoded);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log token verification failure for debugging purposes
        console.log('Token verification failed:', error);
        // Return a 403 status if the token is invalid or expired
        return res.status(403).json({
            message: 'Invalid or expired token'
        });
    }
};
