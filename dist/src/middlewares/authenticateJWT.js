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
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    // If no token is provided, return a 403 response
    if (!token) {
        res.status(403).json({
            message: 'No token provided.'
        });
        return; // Ensure that the middleware stops execution
    }
    // Verify the token using the secret key (this is a synchronous check)
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err) {
            res.status(403).json({
                message: 'Invalid token.'
            });
            return; // Ensure that the middleware stops execution
        }
        // Attach the user object to the request, ensuring 'tier' and 'role' are included
        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            tier: decoded.tier,
            role: decoded.role
        };
        next(); // Proceed to the next middleware or route handler
    });
};

//# sourceMappingURL=authenticateJWT.js.map