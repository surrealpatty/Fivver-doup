// src/middlewares/authMiddleware.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticateJWT", {
    enumerable: true,
    get: function() {
        return authenticateJWT;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authenticateJWT = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Token is expected as "Bearer <token>"
    // If no token is provided, respond with a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    // Verify the token and decode it
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(403).json({
                message: 'Token is invalid'
            }); // Token is invalid
        }
        // Attach the decoded user payload to the request object (req.user)
        req.user = decoded; // Cast decoded object to UserPayload type
        next(); // Proceed to the next middleware or route handler
    });
};

//# sourceMappingURL=authMiddleware.js.map