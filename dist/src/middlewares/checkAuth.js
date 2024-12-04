// src/middleware/checkAuth.ts
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
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({
            message: 'Authorization token is missing'
        });
        return; // Ensure function returns when response is sent
    }
    try {
        // Verify the token
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Attach user information to the request object for further use in the route
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        });
        return; // Ensure function returns when response is sent
    }
};

//# sourceMappingURL=checkAuth.js.map