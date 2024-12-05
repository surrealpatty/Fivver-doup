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
        // Extract the token from the Authorization header
        const authorizationHeader = req.headers['authorization'];
        // Check if the header exists and starts with "Bearer"
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Authorization token is missing or invalid'
            });
            return; // Return here to stop further processing
        }
        const token = authorizationHeader.split(' ')[1]; // Extract the token after "Bearer"
        // Check if the token is present
        if (!token) {
            res.status(401).json({
                message: 'Authorization token is missing'
            });
            return; // Return here to stop further processing
        }
        const jwtSecret = process.env.JWT_SECRET;
        // Ensure the JWT_SECRET is configured in the environment variables
        if (!jwtSecret) {
            console.error('JWT_SECRET is not configured in the environment variables');
            res.status(500).json({
                message: 'Internal server error'
            });
            return; // Return here to stop further processing
        }
        // Verify the token and decode the payload
        const decoded = _jsonwebtoken.default.verify(token, jwtSecret);
        // Attach the user data from the decoded token to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token authentication failed:', error);
        // Handle token verification errors
        res.status(403).json({
            message: 'Invalid or expired token'
        });
    }
};

//# sourceMappingURL=authenticateToken.js.map