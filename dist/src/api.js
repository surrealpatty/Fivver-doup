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
const authenticateToken = (req, res, next)=>{
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authorization token is missing or invalid'
            });
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Authorization token is missing'
            });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not configured in the environment variables');
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
        // Decode the JWT and cast it to the UserPayload type
        const decoded = _jsonwebtoken.default.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token authentication failed:', error);
        return res.status(403).json({
            message: 'Invalid or expired token'
        });
    }
};
