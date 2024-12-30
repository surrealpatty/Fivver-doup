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
    // Define the options for JWT verification without `complete: true`
    const options = {
        algorithms: [
            'HS256'
        ]
    };
    try {
        // Verify the token and get the decoded payload
        _jsonwebtoken.default.verify(token, SECRET_KEY, options, (err, decoded)=>{
            if (err) {
                return res.status(401).json({
                    message: 'Invalid or expired token'
                });
            }
            // Since `decoded` can be `string | JwtPayload`, we assert that it's `JwtPayload`
            if (typeof decoded === 'object' && decoded !== null) {
                req.user = decoded; // Assert that decoded is of type UserPayload
            } else {
                return res.status(401).json({
                    message: 'Invalid token structure'
                });
            }
            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

//# sourceMappingURL=authenticateJWT.js.map