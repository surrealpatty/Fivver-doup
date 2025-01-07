// src/middlewares/authenticateJWT.ts
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
// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const authenticateToken = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header
    if (!token) {
        return res.status(401).json({
            message: 'Authorization token is missing'
        });
    }
    // Try to verify the token using jwt.verify
    try {
        // jwt.verify automatically accepts options, so we can type the function instead of the options object
        _jsonwebtoken.default.verify(token, SECRET_KEY, {
            algorithms: [
                'HS256'
            ]
        }, (err, decoded)=>{
            if (err) {
                return res.status(401).json({
                    message: 'Invalid or expired token'
                });
            }
            // Check if the decoded token is an object and contains the user payload
            if (decoded && typeof decoded === 'object' && decoded !== null) {
                // Ensure 'tier' is always defined as UserTier (fix the type mismatch)
                const decodedUser = decoded;
                if (!decodedUser.tier) {
                    decodedUser.tier = 'free'; // Set a default tier if it's undefined
                }
                req.user = decodedUser; // Attach user payload to request
            } else {
                return res.status(401).json({
                    message: 'Invalid token structure'
                });
            }
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};
