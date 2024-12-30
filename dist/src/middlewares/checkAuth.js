// src/middlewares/checkAuth.ts
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
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const authenticateToken = (req, res, next)=>{
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.status(401).json({
            message: 'Authorization token is missing or invalid'
        });
        return; // Terminate the function after sending the response
    }
    // Extract the token from the Authorization header
    const token = authorizationHeader.split(' ')[1]; // Token is expected in "Bearer token" format
    if (!token) {
        res.status(401).json({
            message: 'Authorization token is missing'
        });
        return; // Terminate the function after sending the response
    }
    try {
        // Decode the token and ensure it's a valid UserPayload
        const decoded = _jsonwebtoken.default.verify(token, SECRET_KEY); // Assert type as UserPayload
        req.user = decoded; // Set req.user to the decoded payload (UserPayload)
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        });
        return; // Terminate the function after sending the response
    }
};

//# sourceMappingURL=checkAuth.js.map