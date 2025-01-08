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
    generateToken: function() {
        return generateToken;
    },
    verifyToken: function() {
        return verifyToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Secret key for JWT generation and verification
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use environment variable for security
const generateToken = (user)=>{
    // Ensure user object contains required properties
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        tier: user.tier,
        role: user.role
    };
    try {
        // Sign and return the token with a 1-hour expiration
        return _jsonwebtoken.default.sign(payload, SECRET_KEY, {
            expiresIn: '1h'
        });
    } catch (err) {
        // Log the error and throw a custom error if token generation fails
        console.error('Token generation failed:', err);
        throw new Error('Failed to generate token');
    }
};
const verifyToken = (token)=>{
    try {
        // Verify and decode the token
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Return the decoded user payload if verification is successful
        return decoded;
    } catch (err) {
        // Log the error with specific details for debugging
        console.error('Token verification failed:', err);
        // Handle specific error cases for expired or malformed tokens
        if (err instanceof _jsonwebtoken.default.TokenExpiredError) {
            console.error('Token has expired');
        } else if (err instanceof _jsonwebtoken.default.JsonWebTokenError) {
            console.error('Malformed token');
        }
        // Return null for invalid or expired tokens
        return null;
    }
};
