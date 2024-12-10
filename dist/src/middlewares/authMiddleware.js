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
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key
const authenticateToken = (req, res, next // The next middleware function
)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header
    if (!token) {
        return res.status(401).json({
            message: 'Authorization token is missing'
        });
    }
    try {
        // Verify the token
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY);
        // Attach user data to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

//# sourceMappingURL=authMiddleware.js.map