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
// Secret key for JWT generation and verification (ensure this is securely stored in environment variables)
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Fallback secret key for JWT
const generateToken = (user)=>{
    // Create the payload with user details
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        tier: user.tier,
        role: user.role
    };
    // Sign and return the token with 1 hour expiration
    return _jsonwebtoken.default.sign(payload, SECRET_KEY, {
        expiresIn: '1h'
    }); // Token expires in 1 hour
};
const verifyToken = (token)=>{
    try {
        // Verify and decode the token, `JwtPayload` is used as it is the base type returned from `jwt.verify()`
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Return the decoded user payload if verification is successful
        return decoded;
    } catch (err) {
        // Log the error and return null if verification fails
        console.error('Token verification failed:', err);
        return null; // Return null if the token is invalid or expired
    }
};

//# sourceMappingURL=jwt.js.map