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
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({
            message: 'Unauthorized'
        }); // Send response directly, no return needed
        return; // Terminate the function, no need to return anything
    }
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET || '', (err, user)=>{
        if (err) {
            res.status(403).json({
                message: 'Forbidden'
            }); // Send response directly, no return needed
            return; // Terminate the function, no need to return anything
        }
        if (user) {
            // Cast the 'user' to match our UserPayload interface
            const userPayload = {
                id: user.id,
                email: user.email,
                username: user.username,
                tier: user.tier
            };
            req.user = userPayload; // Attach user info to req.user
        }
        next(); // Proceed to next middleware
    });
};

//# sourceMappingURL=authMiddleware.js.map