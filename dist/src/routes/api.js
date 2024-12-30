"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkAuth", {
    enumerable: true,
    get: function() {
        return checkAuth;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key
const checkAuth = (req, res, next)=>{
    // Use req.get() to safely access the authorization header
    const token = req.get('authorization')?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({
            message: 'Authorization token is missing'
        });
        return; // Ensure function returns when response is sent
    }
    try {
        // Verify the token
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Handle the case where email is optional and may be undefined
        if (decoded.email === undefined) {
            console.warn('User payload is missing email');
        }
        // Handle the case where username is optional and may be undefined
        if (decoded.username === undefined) {
            console.warn('User payload is missing username');
        }
        req.user = decoded; // Use the correct type assertion
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        });
        return; // Ensure function returns when response is sent
    }
};

//# sourceMappingURL=api.js.map